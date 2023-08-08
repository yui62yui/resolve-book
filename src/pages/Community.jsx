import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

const Community = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState();
  const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:4000/test');
    console.log({ data });
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>community 고민의 장</h1>
      <div>
        {posts?.map((post) => {
          return (
            <div
              onClick={() => {
                const selectPost = posts.find((item) => post.id === item.id);
                setOpen(true);
                if (selectPost) {
                  setSelectedPost(selectPost);
                }
              }}
              key={post.id}
              style={{
                border: '1px solid white',
                margin: '10px',
                padding: '10px',
                color: 'white'
              }}
            >
              <div>{post.userConcern}</div>
              <div>{post.matchedAdvice.message}</div>
              <div>
                {post.matchedAdvice.author}&nbsp;-{post.matchedAdvice.authorProfile}
              </div>
            </div>
          );
        })}
      </div>
      <React.Fragment>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg'
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.surface'
              }}
            />
            <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
              {selectedPost?.userConcern}
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              {selectedPost?.matchedAdvice.message}
              <br />
              {selectedPost?.matchedAdvice.author}&nbsp;-{selectedPost?.matchedAdvice.authorProfile}
            </Typography>
          </Sheet>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default Community;
