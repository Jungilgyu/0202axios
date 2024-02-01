import { useNavigate } from "react-router-dom";

import HelpIcon from "@mui/icons-material/Help";

const QnaButton = () => {
  const navigate = useNavigate();

  const handleHelp = () => {
    navigate("/help");
  };

  return (
    <div id="help-container" onClick={() => handleHelp()}>
      <HelpIcon id="help-icon" />
      <div>도움이 필요하신가요?</div>
    </div>
  );
};

export default QnaButton;
