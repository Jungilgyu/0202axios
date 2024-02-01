// 제목 생략 스타일
import { styled } from "@mui/system";

const TruncatedTitle = styled("div")(({ theme, truncateWidth }) => ({
  width: truncateWidth || "60%",
  whiteSpace: "nowrap",
  textAlign: "center",
  textOverflow: "ellipsis",
  overflow: "hidden",
}));

export default TruncatedTitle;
