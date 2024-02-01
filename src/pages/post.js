import { Container } from '@mui/material';
import MainPost from '../components/PostList/MainPost';
import Search from '../components/Search/Search.jsx';

const post = () => {
    return (
        <Container>
      <h1 className="post-page-title">게시글페이지</h1>
            
            <MainPost />        
        </Container>
    );
};

export default post;

// 여기경로 
{/* <Route path="/post" element={<PostMain />} /> */}