import { createSlice } from '@reduxjs/toolkit';
import getCurrentTime from "../utils/currentTime";

const initialChatState = {
  // 임의의 값 넣어놓음
  chat: [ {
    chatId: 1,
    chatRoomId : 1,
    sender: '아궁빵뎡',
    message: '안녕하세요! 거래 희망합니다',
    imgCode: '',
    sendTime : getCurrentTime(),
    isPay: false,
  }, 
  {
    chatId: 2,
    chatRoomId : 1,
    sender: '제노예요',
    message: '네 결제 요청 보낼게요~',
    imgCode: '',
    sendTime : getCurrentTime(),
  }, 
  {
    chatId: 1,
    chatRoomId : 2,
    sender: '제노예요',
    message: '저요 제가 아니면 안돼요',
    imgCode: '',
    sendTime : '15:31',
  }, 
   ],
  //  const visiterList = ["아궁빵뎡", "제노예요", "김필릭스용복"];
  // const lastMessageList = [
  //   "안녕하세요 거래 희망합니다!",
  //   "혹시 교환 완료되었나요?",
  //   "저요 제가 아니면 안돼요",
  // ];
  // const countList = [1, 2, 1];
  // const roomIdList = [1, 2, 3];
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    sendChat: (state, action) => {
      state.chat = [...state.chat, action.payload];
    },
  },
});

export const { sendChat, } = chatSlice.actions;
export default chatSlice.reducer;
