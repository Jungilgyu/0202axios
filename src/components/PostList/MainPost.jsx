import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Card from "../../components/UI/Card";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


const PAGE_SIZE = 4; // 페이지당 표시할 카드 수

export default function BasicTabs({ isPreview }) {
  const [value, setValue] = useState(0);
  const [visibleCards, setVisibleCards] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false); // 데이터를 불러오는 중인지 여부를 나타내는 상태
  const [datas, setDatas] = useState([]);

  

  // const posts = useSelector((state) => (state.post ? state.post.posts : []));
  // const searchs = useSelector((state) =>
  //   state.search ? state.search.searchs : []
  // );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
    setIsLoading(true); // 데이터를 불러오는 중임을 나타냄

    // 추가 데이터를 요청
    axios.get(`${process.env.PUBLIC_URL}/data.json`)
      .then((res) => {
        const newData = res.data.slice(visibleCards, visibleCards + PAGE_SIZE);
        setDatas((prevData) => [...prevData, ...newData]);
        setVisibleCards(prev => prev + PAGE_SIZE);
        setIsLoading(false); // 데이터 요청이 완료됨
      })
      .catch((err) => {
        console.error('Error fetching data', err);
        setIsLoading(false); // 데이터 요청이 실패함
      });
  }
};

useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [visibleCards, isLoading]);

useEffect(() => {
  // 페이지 로드 시 초기 데이터를 가져옴
  axios.get(`${process.env.PUBLIC_URL}/data.json`)
    .then((res) => {
      setDatas(res.data.slice(0, visibleCards));
    })
    .catch((err) => {
      console.error('Error fetching initial data', err);
    });
}, []);

  return (
    <div sx={{ width: "100%" }}>
      {/* <p>
        값 전달 확인용 :{" "}
        {searchs.length > 0 && (
          <>
            {searchs[searchs.length - 1].ownMembers}{" "}
            {searchs[searchs.length - 1].targetMembers}{" "}
            {searchs[searchs.length - 1].cardType}
          </>
        )}
      </p> */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="교환"
            {...a11yProps(0)}
            sx={{ fontWeight: value === 0 ? 600 : 400 }}
          />
          <Tab
            label="판매"
            {...a11yProps(1)}
            sx={{ fontWeight: value === 1 ? 600 : 400 }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div
          style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
        >
          {datas
            .slice(0, visibleCards)
            .filter((post) => post.type === "교환")
            .map((post, index) => (
              <Card
                key={index}
                style={{
                  width: "calc(50% - 8px)",
                  marginRight: "16px",
                  marginBottom: "16px",
                  cursor: "pointer",
                }}
                id={post.id}
                title={post.title}
                images={post.images}
                ownMembers={post.ownMembers}
                targetMembers={post.targetMembers}
                content={post.content}
                type={post.type}
                isBartered={post.isBartered}
              ></Card>
            ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div
          style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
        >
          {datas
            .slice(0, visibleCards)
            .filter((post) => post.type === "판매")
            .map((post, index) => (
              <Card
                key={index}
                style={{
                  width: "calc(50% - 8px)",
                  marginRight: "16px",
                  marginBottom: "16px",
                  cursor: "pointer",
                }}
                id={post.id}
                title={post.title}
                images={post.images}
                content={post.content}
                ownMembers={post.ownMembers}
                type={post.type}
                isSold={post.isSold}
              ></Card>
            ))}
        </div>
      </CustomTabPanel>
    </div>
  );
}
