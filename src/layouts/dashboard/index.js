/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Grid, Paper, Typography, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Modal from '@material-ui/core/Modal';

import { AuthContext } from '../../AuthContext';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import PostCard from '../../components/posts/Card';
import { getAllPosts, getPetById } from '../../api';

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
  const [original, setOriginal] = useState([]);
  const [posts, setPosts] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [postID, setPostID] = useState('');

  const [energy, setEnergy] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [aggression, setAggression] = useState(0);

  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res.data);
      setOriginal(res.data);
    });
  }, []);

  const handleClick = (post) => {
    console.log(post);
    setClicked(true);
    setPostID(post.id);
  };

  const toNum = (s) => {
    if (s == 'Low') return 1;
    if (s == 'Medium') return 2;
    if (s == 'High') return 3;
  };
  const search = () => {
    let arr = [];
    for (let item of original) {
      if (energy == 0 || toNum(item.energy) == energy) {
        if (maintenance == 0 || toNum(item.maintenance) == maintenance) {
          if (aggression == 0 || toNum(item.aggression) == aggression) {
            arr.push(item);
          }
        }
      }
    }
    setPosts(arr);
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
                <Paper elevation={3}>
                  <div style={{ padding: '10px' }}>
                    <Typography variant="h3" component="h4">
                      Search
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <Typography variant="h5">Energy</Typography>
                        <Select
                          style={{ width: '100%' }}
                          value={energy}
                          onChange={(e) => setEnergy(e.target.value)}
                        >
                          <MenuItem value={0}>Any</MenuItem>
                          <MenuItem value={1}>Low</MenuItem>
                          <MenuItem value={2}>Medium</MenuItem>
                          <MenuItem value={3}>High</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h5">Aggression</Typography>
                        <Select
                          style={{ width: '100%' }}
                          value={aggression}
                          onChange={(e) => setAggression(e.target.value)}
                        >
                          <MenuItem value={0}>Any</MenuItem>
                          <MenuItem value={1}>Low</MenuItem>
                          <MenuItem value={2}>Medium</MenuItem>
                          <MenuItem value={3}>High</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h5"> Maintenance</Typography>
                        <Select
                          style={{ width: '100%' }}
                          value={maintenance}
                          onChange={(e) => setMaintenance(e.target.value)}
                        >
                          <MenuItem value={0}>Any</MenuItem>
                          <MenuItem value={1}>Low</MenuItem>
                          <MenuItem value={2}>Medium</MenuItem>
                          <MenuItem value={3}>High</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>

                    <br />
                    <Grid container>
                      <Grid item xs={9} />
                      <Grid item xs={2}>
                        <Button
                          style={{ width: '100%' }}
                          variant="contained"
                          color="primary"
                          onClick={search}
                        >
                          Apply
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Paper>

                <br />
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
