import Avatar from "@mui/material/Avatar";
import Img from "../../assets/images/아이브_원영.PNG";

const ChartGirl = (props) => {
  return (
    <div>
      <div id="chart-container">
        <div id="rank-1-idol">
          <div className="main-big">1. </div>
          <Avatar
            id="rank-1-image"
            src={Img}
            sx={{ width: "4rem", height: "4rem" }}
          />
          <div className="main-big">{props.data[0]}</div>
        </div>
        <div id="rank-23-idol">
          <div id="rank-2-idol">
            <p>2. </p>
            <Avatar className="rank-23-image" src={Img} />
            <p>{props.data[1]}</p>
          </div>
          <div id="rank-3-idol">
            <p>3. </p>
            <Avatar className="rank-23-image" src={Img} />
            <p>{props.data[2]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartGirl;
