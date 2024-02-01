import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, useLocation  } from 'react-router-dom';
import Main from './pages/main';
import Alarm from './pages/alarm';
import Chat from './pages/chat';
import Profile from './pages/profile';
import Login from './pages/login';

import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme'; 

import NavBar from './components/NavBar/NavBar';
import ChatRoom from './pages/chatRoom';
import PostWrite from './pages/postWrite.js';
import PostMain from './pages/post.js';
import FloatingActionButtons from './components/UI/FloatingActionButtons.jsx';
import store from './store2/index.js';
import DetailPost from './components/PostList/DetailPost.jsx';
import Guide from './pages/guide.js';
import Modify from './pages/postModify.js';
// import { useSelector } from 'react-redux'; // 

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  // const store = createStore(rootReducer);
  

  return (
    
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <ScrollToTop />
          <NavBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main" element={<Main />} />
            <Route path="/alarm" element={<Alarm />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chatroom/:roomId" element={<ChatRoom />} />
            <Route path="/write" element={<PostWrite />}/>
            <Route path="/post" element={<PostMain />} />
            <Route path="/post/:id" element={<DetailPost />} />
            <Route path="/login" element={<Login /> } />
            <Route path="/help" element={<Guide /> } />
            <Route path="/modify/:id" element={<Modify /> } />

          </Routes>
            
            <FloatingActionButtons />
          
         
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
    
  );
};

export default App;
