import { createSlice } from '@reduxjs/toolkit';
import logo1 from "../assets/images/logo_nct.png";

const initialPostState = {
  // 임의의 값 넣어놓음
  posts: [ {
    id: 1,
    writerId: '1234',
    writerNickname: '제노예요',
    title: "[교환1] 질주 미공포 교환해요",
    images:['/assets/images/photocard/도영.jpg', '/assets/images/photocard/도영.jpg', '/assets/images/photocard/제노.PNG', '/assets/images/photocard/마크.jpg','/assets/images/photocard/태민.jpg',],
    group: {value: "NCT", label: "NCT", avatarSrc: logo1},
    ownMembers:[{value: '도영', label: '도영'}],
    targetMembers:[{value: '제노', label: '제노'}],
    content: `받자마자 탑로더에 보관해서 상태 좋습니다.\n그리고 도영이가 정말 귀여워요\n귀여운 도영이\n데려가세요`,
    cardType: '미공포',
    type:'교환',
    isBartered: true,

  }, 
  {
      id: 11,
      writerId: '5678',
      writerNickname: '아궁빵뎡',
      title: "Be There For Me 앨범포카 판매해요",
      images: ['/assets/images/photocard/도영.jpg'],
      group: {value: "NCT", label: "NCT", avatarSrc: logo1},
      ownMembers:[{value: '도영', label: '도영'}],
      content:'받자마자 탑로더에 보관해서 상태 좋습니다.',
      cardType: '앨범포카',
      type:'판매',
      isSold: true,
    },
      {
        id: 2,
        writerId: "5678",
        writerNickname: "아궁빵뎡",
        title: "[교환2] 질주 미공포 교환해요",
        images: [
          "/assets/images/photocard/도영.jpg",
          "/assets/images/photocard/도영.jpg",
        ],
        group: {value: "NCT", label: "NCT", avatarSrc: logo1},

        ownMembers: [{ value: "도영", label: "도영" }],
        targetMembers: [{ value: "제노", label: "제노" }],
        content: `받자마자 탑로더에 보관해서 상태 좋습니다.\n그리고 도영이가 정말 귀여워요\n귀여운 도영이\n데려가세요`,
        cardType: "미공포",
        type: "교환",
        isBartered: false,
      },
      {
        id: 3,
        writerId: "1234",
        writerNickname: "제노예요",
        title: "[교환3] 질주 미공포 교환해요",
        images: [
          "/assets/images/photocard/도영.jpg",
          "/assets/images/photocard/도영.jpg",
        ],
        group: {value: "NCT", label: "NCT", avatarSrc: logo1},

        ownMembers: [{ value: "도영", label: "도영" }],
        targetMembers: [{ value: "제노", label: "제노" }],
        content: `받자마자 탑로더에 보관해서 상태 좋습니다.\n그리고 도영이가 정말 귀여워요\n귀여운 도영이\n데려가세요`,
        cardType: "미공포",
        type: "교환",
        isBartered: false,
      },
      {
        id: 4,
        writerId: "1234",
        writerNickname: "제노예요",
        title: "[교환4] 질주 미공포 교환해요",
        images: [
          "/assets/images/photocard/도영.jpg",
          "/assets/images/photocard/도영.jpg",
        ],
        group: {value: "NCT", label: "NCT", avatarSrc: logo1},

        ownMembers: [{ value: "도영", label: "도영" }],
        targetMembers: [{ value: "제노", label: "제노" }],
        content: `받자마자 탑로더에 보관해서 상태 좋습니다.\n그리고 도영이가 정말 귀여워요\n귀여운 도영이\n데려가세요`,
        cardType: "미공포",
        type: "교환",
        isBartered: false,
      },
      {
        id: 5,
        writerId: "1234",
        writerNickname: "제노예요",
        title: "[교환5] 질주 미공포 교환해요",
        images: [
          "/assets/images/photocard/도영.jpg",
          "/assets/images/photocard/도영.jpg",
        ],
        group: {value: "NCT", label: "NCT", avatarSrc: logo1},

        ownMembers: [{ value: "도영", label: "도영" }],
        targetMembers: [{ value: "제노", label: "제노" }],
        content: `받자마자 탑로더에 보관해서 상태 좋습니다.\n그리고 도영이가 정말 귀여워요\n귀여운 도영이\n데려가세요`,
        cardType: "미공포",
        type: "교환",
        isBartered: true,
      },
   ],
};

const postSlice = createSlice({
  name: 'post',
  initialState: initialPostState,
  reducers: {
    addPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
    addCards: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    modifyPost: (state, action) => {
      const modifiedPost = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === modifiedPost.id ? modifiedPost : post
      );
    },
  },
});

export const { addPost, addCards, modifyPost  } = postSlice.actions;
export default postSlice.reducer;
