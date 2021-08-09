/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { getPostById, getAllComments, addComment } from '../../api';
import { useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, TextField, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { getDogPic } from '../../api';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import { AuthContext } from '../../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const Comment = ({ data }) => (
  <div style={{ fontSize: '40%' }}>
    <Divider style={{ margin: '15px' }} />
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar alt="Remy Sharp" src={''} />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: 'left' }}>{data.user_id}l</h4>
        <p style={{ textAlign: 'left', color: 'gray' }}>{data.created_at}</p>
        <p style={{ textAlign: 'left' }}>{data.text}</p>
      </Grid>
    </Grid>
  </div>
);

const Post = (props) => {
  const [post, setPost] = useState({});
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const classes = useStyles();
  const [dogImg, setDogImg] = useState(
    'data:image/png;base64,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'
  );

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState('');

  const { isAuth, user } = useContext(AuthContext);

  useEffect(() => {
    getPostById(id).then((res) => {
      setPost(res.data);
      console.log(res.data);
    });

    getDogPic().then((res) => {
      setDogImg(res.data.message);
    });
  }, []);

  const handleCommentSubmit = () => {
    if (commentText == '') {
      toast.info('Comment cannot be empty.', { position: 'top-center' });
    } else {
      addComment(id, user.id, commentText);
    }
  };

  useEffect(() => {
    getAllComments(id).then((res) => {
      setComments(res.data.reverse());
    });
  }, [handleCommentSubmit]);

  return (
    <>
      <ToastContainer />
      <div className={classes.root}>
        <Grid container spacing={3} style={{ margin: '10px' }}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>
              {/* {post} */}
              <Typography fontSize={34} sx={{ color: 'text.primary' }}>
                {post.title}
              </Typography>
              <Typography>{new Date(post.created_at).toDateString()}</Typography>
              <Typography>{post.user_id}</Typography>
              <br />
              <Typography>Name: {post.name}</Typography>
              <Typography>Age: {post.age}</Typography>
              <br />
              <img alt="1" height="300px" src={dogImg} />
              <br />
              <Typography>{post.content}</Typography>
            </Paper>
            <br />

            <Paper
              className={classes.paper}
              elevation={3}
              style={{ maxHeight: '400px', overflow: 'auto' }}
            >
              {/* {post} */}
              <Typography fontSize={34} sx={{ color: 'text.primary' }}>
                Comments
                {comments.map((comment, item) => (
                  <Comment data={comment} />
                ))}
              </Typography>
            </Paper>

            <br />
            {isAuth ? (
              <Paper className={classes.paper} elevation={3}>
                {/* {post} */}
                <Grid container>
                  <TextField
                    style={{ width: '100%' }}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </Grid>
                <Grid container>
                  <Button onClick={handleCommentSubmit}>Submit</Button>
                </Grid>
              </Paper>
            ) : (
              <></>
            )}
            <br />
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </div>
    </>
  );
};

export default Post;
