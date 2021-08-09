/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Grid, Paper } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

import { AuthContext } from '../../AuthContext';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import PostCard from '../../components/posts/Card';
import { getAllPosts } from '../../api';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [postID, setPostID] = useState('');

  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    getAllPosts().then((res) => setPosts(res.data));
  }, []);

  const handleClick = (post) => {
    console.log(post);
    setClicked(true);
    setPostID(post.id);
  };
  return (
    <>
      {clicked ? (
        <Redirect
          push
          to={{
            pathname: '/post',
            search: '?id=' + postID
          }}
        />
      ) : (
        <>
          {!isAuth ? (
            <Redirect to="login" />
          ) : (
            <RootStyle>
              <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
              <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
              <MainStyle>
                <Grid container spacing={3}>
                  {posts.map((post, item) => (
                    <Grid item xs={3}>
                      <div
                        style={{ cursor: 'pointer' }}
                        tabIndex={item}
                        role="button"
                        onClick={(item) => handleClick(post)}
                      >
                        <PostCard post={post} />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </MainStyle>
            </RootStyle>
          )}
        </>
      )}
    </>
  );
}
