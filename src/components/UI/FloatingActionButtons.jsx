import * as React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Popover from "@mui/material/Popover";

import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";

import { useNavigate } from "react-router-dom";

export default function FloatingActionButtons() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "5%",
        right: "5%",
        "& > :not(style)": { m: 1 },
        zIndex: 2000,
      }}
    >
      <Fab color="warning" aria-label="add">
        <AddIcon onClick={handleClick} />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          disableScrollLock
          anchorOrigin={{
            horizontal: -90,
            vertical: -90,
          }}
        >
          <div
            id="post-icon"
            onClick={() => {
              navigate("/write");
              handleClose();
            }}
          >
            <div>글쓰기</div>
            <CreateIcon />
          </div>
        </Popover>
      </Fab>
    </Box>
  );
}
