import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Container,
  ImageList,
  ImageListItem,
  Chip,
  Avatar,
  Button,
} from "@mui/material";

const DetailPost = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const posts = useSelector((state) => (state.post ? state.post.posts : []));
  const post = posts.find((p) => p.id == id);

  // 내 게시글인지 판별
  const currentUser = useSelector((state) => state.user.user);
  const isCurrentUserWriter = currentUser && currentUser.id === post.writerId;

  const chatRoomId = post.type == "교환" ? 1 : 2;
  const handleChatClick = () => {
    // 채팅방 만드는 메서드 먼저
    // 해당 채팅방 id 리턴 받아서 그 채팅방으로 이동
    navigate(`/chatroom/${chatRoomId}`, { state: id });
  };

  const handleModifyClick = (id) => {
    console.log(id);
    navigate(`/modify/${id}`);
  };

  const handlePullupClick = () => {};
  return (
    <Container>
      <div>
        <div id="post-title-container">
          <h2>{post.title}</h2>
        </div>
        <hr />
        <div id="writer-type-container">
          <div>작성자 ⯌ {post.writerNickname}</div>
          <Chip
            id="card-type-container"
            label={post.cardType}
            size="small"
            sx={{ ml: 1 }}
          ></Chip>
        </div>
        <div id="image-list-container">
          <ImageList sx={{ display: "flex", width: "100%" }} rowHeight={200}>
            {post.images.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={image}
                  loading="lazy"
                  style={{
                    width: "20vw",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>

        <div id="post-info-container">
          <div>
            {post.type == "교환" ? (
              <div>
                <div>
                  <div id="post-member-container">
                    {`있어요: ${post.ownMembers
                      .map((member) => member.value)
                      .join(", ")}`}
                    {" ⯌ "}
                    {`구해요: ${post.targetMembers
                      .map((member) => member.value)
                      .join(", ")}`}
                  </div>
                </div>
                <div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  {`멤버: ${post.ownMembers
                    .map((member) => member.value)
                    .join(", ")}`}
                </div>
              </div>
            )}
          </div>
        </div>
        <hr style={{ margin: "1rem 0" }} />
        <div id="post-content-container" style={{ whiteSpace: "pre-line" }}>
          <div>{post.content}</div>
        </div>
      </div>

      <div id="chat-button-container">
        {isCurrentUserWriter ? (
          <div>
            <Button
              id="modify-button"
              variant="contained"
              size="large"
              onClick={() => handleModifyClick(post.id)}
            >
              수정하기
            </Button>
            <Button
              id="pullup-button"
              variant="contained"
              size="large"
              onClick={handlePullupClick}
            >
              끌어올리기
            </Button>
          </div>
        ) : (
          <Button
            id="chat-button"
            variant="contained"
            size="large"
            onClick={handleChatClick}
          >
            1:1 채팅하기
          </Button>
        )}
      </div>
    </Container>
  );
};

export default DetailPost;
