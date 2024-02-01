import { createSlice } from '@reduxjs/toolkit';

const initialChatListState = {
  // 임의의 값 넣어놓음
  // owner, visiter 동일하면 같은 방에 넣어야 함
  chatList: [ {
    chatRoomId: 1,
    articleId: 1,
    owner: '제노예요',
    visiter: '아궁빵뎡',
    lastMessage: '네 결제 요청 보낼게요~',
    lastMessageTime: '2024-02-01 10:33',
    isOver: false,
    uncheckedCount: 1,
  }, 
  {
    chatRoomId: 2,
    articleId: 11,
    owner: '아궁빵뎡',
    visiter: '제노예요',
    lastMessage: '저요 제가 아니면 안돼요',
    lastMessageTime: '2024-02-01 15:31',
    isOver: false,
    uncheckedCount: 1,
  }, 
   ],
};

const chatListSlice = createSlice({
  name: 'chatList',
  initialState: initialChatListState,
  reducers: {
    addChatList: (state, action) => {
      state.chatList = [...state.chatList, action.payload];
    },
  },
});

export const { addChatList, } = chatListSlice.actions;
export default chatListSlice.reducer;
