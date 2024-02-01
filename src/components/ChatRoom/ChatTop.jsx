import { Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

import { useNavigate, useParams } from "react-router-dom";

import PayModal from "../UI/Modal/PayRequestModal";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Logout from "@mui/icons-material/Logout";

const ChatMenu = ({ updateMessages, postId }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const loginUser = useSelector((state) =>
    state.user ? state.user.user.name : ""
  );

  const { roomId } = useParams();

  const posts = useSelector((state) => (state.post ? state.post.posts : []));
  const chatRoomInfo = posts.find((post) => post.id == postId);
  console.log(chatRoomInfo);

  // 메뉴 관련
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 모달 관련
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handlePay = () => {
    // 결제 기능
    handleModalOpen();
    setAnchorEl(null);
  };

  const handleQuitChatroom = () => {
    setAnchorEl(null);
    navigate("/chat");
  };

  const handleDone = () => {
    // 게시글 상태 수정하기 (교환/판매 완료로)
    setAnchorEl(null);
    navigate("/chat");
  };

  return (
    <div>
      <PayModal
        open={modalOpen}
        handleClose={handleModalClose}
        updateMessages={updateMessages}
      />
      <div id="chat-top">
        <div id="chat-top-left">
          <Typography variant="h5" component="div" id="chatroom-title">
            {chatRoomInfo.writerNickname}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {chatRoomInfo.title}
          </Typography>
        </div>
        <div id="chat-top-right">
          {/* <MenuIcon id="hamburger-icon" /> */}
          <IconButton
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            className="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            disableScrollLock
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                backgroundColor: "white",
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {chatRoomInfo.type === "교환" && (
              <div>
                {chatRoomInfo.writerNickname === loginUser && (
                  <MenuItem onClick={handleDone}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    교환완료
                  </MenuItem>
                )}
                <MenuItem onClick={handleQuitChatroom}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  나가기
                </MenuItem>
              </div>
            )}
            {chatRoomInfo.type === "판매" && (
              <div>
                {chatRoomInfo.writerNickname === loginUser && (
                  <div>
                    <MenuItem onClick={handlePay}>
                      <ListItemIcon>
                        <PaymentIcon />
                      </ListItemIcon>
                      결제요청
                    </MenuItem>
                    <MenuItem onClick={handleDone}>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon />
                      </ListItemIcon>
                      판매완료
                    </MenuItem>
                  </div>
                )}

                <MenuItem onClick={handleQuitChatroom}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  나가기
                </MenuItem>
              </div>
            )}
          </Menu>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default ChatMenu;
