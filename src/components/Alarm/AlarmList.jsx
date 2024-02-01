import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function InteractiveList() {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item.notificationType === "갈망포카") {
      navigate(`/post/${item.articleId}`);
    } else if (item.notificationType === "채팅알람") {
      navigate("/chat");
    }
  };

  const [readList, setReadList] = useState([
    {
      notificationId: 1,
      notificationType: "갈망포카",
      content: "지금 당신의 갈망포카가 올라왔어요! 확인해보세요",
      sendTime: new Date().toLocaleString(),
      articleId: 1,
      isRead: false,
    },
    {
      notificationId: 2,
      notificationType: "채팅알람",
      content: "제노예요 님이 채팅을 보냈습니다.",
      sendTime: new Date().toLocaleString(),
      chatRoomId: 1,
      isRead: false,
    },
  ]);

  const readAlarm = (index) => {
    setReadList((preReadList) => {
      const newReadList = [...preReadList];
      newReadList[index].isRead = !newReadList[index].isRead;
      return newReadList;
    });
  };

  return (
    <div>
      <div>
        <h1 className="alarm-title">알림리스트</h1>
        <FormControlLabel
          id="alarm-check-all"
          control={
            <Checkbox
              checked={readList.every((item) => item.isRead)}
              onChange={() =>
                setReadList((preReadList) =>
                  preReadList.map((item) => ({ ...item, isRead: true }))
                )
              }
              disabled={readList.every((item) => item.isRead)}
            />
          }
          label="모두 읽음"
        />
      </div>

      <div>
        <List>
          {readList.map((item, index) => (
            <ListItem
              key={index}
              className={item.isRead ? "alarm-read-item" : "alarm-item"}
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => readAlarm(index)}>
                    {item.isRead ? null : <CloseIcon />}
                  </IconButton>
                </>
              }
            >
              <div
                className="alarm-item-container"
                onClick={(e) => {
                  handleItemClick(item);
                }}
              >
                <ListItemAvatar>
                  {item.isRead ? <TaskAltIcon /> : <RadioButtonUncheckedIcon />}
                </ListItemAvatar>
                <div className="alarm-text-container">
                  <ListItemText
                    className="alarm-content"
                    primary={item.notificationType}
                    secondary={item.content}
                  />
                  <span id="alarm-time">{item.sendTime}</span>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
