import * as React from "react";

import { styled } from "@mui/material/styles";
import TruncatedTitle from "../../styles/TruncatedTitle";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomCard = (props) => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const goToDetail = (id) => {
    // 최근 본 게시글 배열에 추가

    navigate(`/post/${id}`);
  };

  const {
    id,
    title,
    images,
    ownMembers,
    targetMembers,
    content,
    type,
    isBartered,
    isSold,
  } = props;

  return (
    <Card
      className={`card-style${isBartered || isSold ? " done-post" : ""}`}
      onClick={() => goToDetail(id)}
    >
      {isBartered && (
        <div className="overlay">
          <p>교환완료</p>
        </div>
      )}
      {isSold && (
        <div className="overlay">
          <p>판매완료</p>
        </div>
      )}
      <CardMedia component="img" height="250" image={images[0]} />
      <CardHeader
        sx={{
          padding: "1rem 1rem 0",
          width: "100%",
        }}
        // action={<IconButton aria-label="settings"></IconButton>}
        title={<TruncatedTitle truncateWidth="80%">{title}</TruncatedTitle>}
      />
      <CardContent className="card-content">
        {type == "교환" ? (
          <div>
            <div>
              <Typography variant="body2" color="text.secondary">
                {`있어요: ${ownMembers
                  .map((member) => member.value)
                  .join(", ")}`}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">
                {`구해요: ${targetMembers
                  .map((member) => member.value)
                  .join(", ")}`}
              </Typography>
            </div>
          </div>
        ) : (
          <div>
            <Typography variant="body2" color="text.secondary">
              {`멤버: ${ownMembers.map((member) => member.value).join(", ")}`}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default CustomCard;
