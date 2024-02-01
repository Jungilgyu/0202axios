import React, {useState, useEffect } from "react";

import MainPost from "../../components/PostList/MainPost.jsx";
import { Container } from "@mui/material";
import { TextField, Button, TextareaAutosize } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Card from "../../components/UI/Card";


const PreviewPost = () => {
  const navigate = useNavigate();
  const [previewPosts, setPreviewPosts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/data.json`)
      .then((res) => {
        setPreviewPosts(res.data.slice(0,4));
      })
      .catch((err) => {
        console.log('Error fetching initial data', err);
      });
  }, []);

  const handleButtonClick = () => {
    navigate("/post");
  };

  return (
    <Container>
      <h2 className="main-title">둘러보기 🔍</h2>
      {/* <MainPost isPreview={true} /> */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {previewPosts.map((post) => (
          <Card
            key={post.id}
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
            isSold={post.isSold}
          />
        ))}
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{ marginRight: "10px" }}
          onClick={handleButtonClick}
        >
          + 더보기
        </Button>
      </div>
    </Container>
  );
};

export default PreviewPost;
