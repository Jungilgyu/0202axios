import * as React from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import NicknameModal from "../UI/Modal/NicknameModal";

const Nickname = () => {
  const nickName = "아궁빵뎡";

  // 모달 관련
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div id="nickname-container">
      <div>닉네임</div>
      <div id="nickname-input">
        <TextField size="small" disabled defaultValue={nickName} />
      </div>
      <Button variant="contained" onClick={handleOpen}>
        수정
      </Button>
      <NicknameModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Nickname;
