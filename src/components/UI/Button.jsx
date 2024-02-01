// 확인, 취소, 이런 버튼들
// 문구 다른 건 못쓰는 건가?? 문구 같은데 랜딩 다른 경우만 재사용??
import * as React from "react";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";

export default function UnstyledButtonsIntroduction() {
  return (
    <Stack spacing={2} direction="row">
      <Button>Button</Button>
      <Button disabled>Disabled</Button>
    </Stack>
  );
}

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const pink = {
  100: "#FB37A3", //main
  200: "#F9D1E9", //가장 연함
  300: "#FB37A3", // gps
  400: "#FD9DD1", //button( 조금 진함)
  500: "#FD68BA", // 눌렀을 때
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${pink[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${pink[200]};
  
  &:hover {
    background-color: ${pink[100]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[500]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }

  &.${buttonClasses.disabled} {
    background-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
  `
);

export { Button };
