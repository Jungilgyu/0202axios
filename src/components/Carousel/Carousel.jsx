import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import image1 from "../../assets/images/banner/도움말.PNG";
import image2 from "../../assets/images/banner/이벤트.png";
import image3 from "../../assets/images/banner/럭키드로우.jpg";

const MyCarousel = () => {
  const example = [
    {
      id: 1,
      url: image1,
      link: "/help",
    },
    {
      id: 2,
      url: image2,
      link: "",
    },
    {
      id: 3,
      url: image3,
      link: "https://m.smtownandstore.com/board/event/read.html?no=539846&board_no=14",
    },
  ];

  const imageStyle = {
    width: "100%",
    height: "50vh",
    display: "block",
    objectFit: "contain",
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Carousel
        cycleNavigation={true}
        navButtonsAlwaysVisible={false}
        showArrows={true}
        centerMode={true}
        centerSlidePercentage={30}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        // indicatorIconButtonProps={indicatorIconButtonProps}
      >
        {example.map((content) => (
          <>
            <Link to={content.link}>
              <img src={content.url} style={imageStyle} />
            </Link>
          </>
        ))}
      </Carousel>
    </div>
  );
};
export default MyCarousel;
