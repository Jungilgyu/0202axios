import * as React from "react";
import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import ReplayCircleFilledOutlinedIcon from "@mui/icons-material/ReplayCircleFilledOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "rgba(105, 112, 119, 1)" : "primary",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor:
      theme.palette.mode === "light" ? "rgba(105, 112, 119, 1)" : "primary",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function GPS() {
  const currentUser = useSelector((state) => state.user.user);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const handleSwitchChange = () => {
    setIsSwitchOn((prev) => !prev);
  };

  return (
    <div id="gps-container">
      <div id="gps-top">
        <FormControlLabel
          labelPlacement="start"
          label="GPS"
          control={
            <IOSSwitch
              checked={isSwitchOn}
              onChange={handleSwitchChange}
              sx={{ m: 1 }}
            />
          }
        />
        <div id="refresh-container">
          <ReplayCircleFilledOutlinedIcon />
        </div>
      </div>
      {isSwitchOn && (
        <div id="gps-bottom">
          <LocationOnOutlinedIcon />
          <div>{currentUser.location}</div>
        </div>
      )}
    </div>
  );
}
