 
import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions} from '../../store2/user.js';


const Redirection = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');

  React.useEffect(async () => {
    await dispatch(userActions.kakaoLogin(code));
  }, []);

 
}

export default Redirection;