import * as React from "react";
import { useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

import { useNavigate } from "react-router-dom";

export default function ChatList() {
  const navigate = useNavigate();

  const moveChatRoom = (roomId, articleId) => {
    navigate(`/chatroom/${roomId}`, { state: articleId });
  };

  const loginUser = useSelector((state) =>
    state.loginUser ? state.loginUser.user.name : null
  );

  // 추가할 부분
  // 현재 유저가 들어간 리스트만 가져와야 함
  const chatLists = useSelector((state) =>
    state.chatList ? state.chatList.chatList : []
  );

  return (
    <div>
      <h1 className="chat-title">채팅목록</h1>
      <List sx={{ width: "100%", maxWidth: 500 }}>
        {chatLists.map((chatroom, index) => (
          <ListItem
            className="chatlist-item"
            key={index}
            onClick={() =>
              moveChatRoom(chatroom.chatRoomId, chatroom.articleId)
            }
          >
            <ListItemText
              primary={
                chatroom.visitor !== loginUser
                  ? chatroom.visiter
                  : chatroom.owner
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {chatroom.lastMessage}
                  </Typography>
                  {` ${chatroom.lastMessageTime}`}
                </React.Fragment>
              }
            />
            <Badge
              badgeContent={chatroom.uncheckedCount}
              color="primary"
              sx={{ marginRight: 2 }}
            ></Badge>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
