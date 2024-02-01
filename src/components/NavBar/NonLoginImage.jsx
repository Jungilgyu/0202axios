import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import { logoutUser } from '../../store2/loginUser.js';
import { useDispatch, useSelector } from "react-redux";
import NonLoginImg from '../../assets/images/nonlogin.PNG';
import kakao from "../../assets/images/kakao_login.png";

const NonLoginIcon = () => {
	const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickUserMenu = async (to) => {
    setAnchorElUser(null);
    await navigate(to);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const GotoLogin = () => {
    
    console.log(user)
		setAnchorElUser(null); // 메뉴 닫기
    navigate('/login');
  };

  return (
    <div className="profile-image-container">
      <Box>
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<img
						id="profile-image"
						className="profile-image gradient-border background-image"
						src={NonLoginImg}
					></img>
				</IconButton> 
        <Paper sx={{ backgroundColor: theme.palette.primary.main }}>
          <Menu
            className="profile-container"
            sx={{ mt: "4rem" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            theme={theme}
          >
            <Divider variant="middle" component="li" />
						<Typography
							sx={{ 
								textAlign: 'center', 
								color: theme.palette.primary.main,
								p: 2,
								fontSize: '1.2rem', // 글자 크기 조절
    						fontWeight: 'bold', // 굵은 글자
							}}
							>
							로그인이 필요한<br/>서비스입니다.
						</Typography>
            <img 	
							id="kakao-button" 
							src={kakao}
							onClick={GotoLogin} 
							style={{ 
								display: 'block', // 이미지를 블록 요소로 설정하여 위아래 여백 추가
								margin: theme.spacing(2), // 상단 여백 추가
							}}
							/>
          </Menu>
        </Paper>
      </Box>
    </div>
  );
};

export default NonLoginIcon;

