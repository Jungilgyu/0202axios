import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChartBoy from "./ChartBoy";
import ChartGirl from "./ChartGirl";
import { Container } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  const now = new Date();
  now.setDate(now.getDate() - 1);

  const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        {...other}
      >
        <p id="chart-time">{formattedDate.toLocaleString()} 기준</p>
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

export default function ChartTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const rankBoy = ["NCT 제노1", "NCT 제노2", "NCT 제노3"];
  const rankGirl = ["아이브 원영1", "아이브 원영2", "아이브 원영3"];

  return (
    <Container sx={{ width: "100%" }}>
      <h2 className="main-title">오늘의 포포차트 🥇</h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="남자아이돌"
            {...a11yProps(0)}
            sx={{ fontWeight: value === 0 ? 600 : 400 }}
          />
          <Tab
            label="여자아이돌"
            {...a11yProps(1)}
            sx={{ fontWeight: value === 1 ? 600 : 400 }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ChartBoy data={rankBoy} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ChartGirl data={rankGirl} />
      </CustomTabPanel>
    </Container>
  );
}
