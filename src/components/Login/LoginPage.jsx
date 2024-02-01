// 로그인 페이지 컴포넌트
import React, { useEffect } from "react";
import logo from "../../assets/images/logo.PNG";
import icon from "../..//assets/images/icon.PNG";
import kakao from "../../assets/images/kakao_login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { KAKAO_AUTH_URL } from "./OAuth";

const LoginPage = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  // useEffect(() => {
  //   axios.post(`${process.env.REACT_APP_URL}kakaoLogin${code}`).then((r) => { // 여기 post()안에를 바꿔야함?
  //     console.log(r.data); // 토큰과 함께 오는 정보들을 출력해보자
  //     navigate('/main'); //
  //   });
  // }, []);

  return (
    <div>
      <div id="login-container">
        <img id="icon-container" src={icon} />
        <h2>안녕하세요 포포입니다.</h2>
        <div id="text-container">
          계정과 비밀번호 입력없이
          <br />
          카카오톡으로 로그인 해보세요.
        </div>
        <img id="kakao-button" src={kakao} onClick={() => loginHandler()} />
      </div>
    </div>
  );
};

export default LoginPage;
