import Avatar from "@mui/material/Avatar";
import Img from "../../assets/images/NCT_제노.PNG";

const BarterPost = (props) => {
  return (
    <div>
      <div id="chart-container">
        <div id="rank-1-idol">
          <p>1. </p>
          <Avatar
            id="rank-1-image"
            src={Img}
            sx={{ width: "4rem", height: "4rem" }}
          />
          <p>{props.data[0]}</p>
        </div>
        <div id="rank-23-idol">
          <div id="rank-2-idol">
            <p>2. </p>
            <Avatar className="rank-23-image" src={Img} />
            
          </div>
          <div id="rank-3-idol">
            <p>3. </p>
            <Avatar className="rank-23-image" src={Img} />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarterPost;
