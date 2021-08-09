import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getDogPic } from '../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function PostCard({ post }) {
  const classes = useStyles();
  const [dogImg, setDogImg] = useState(
    'data:image/png;base64,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'
  );

  useEffect(() => {
    getDogPic().then((res) => {
      setDogImg(res.data.message);
    });
  }, []);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${post.name}, ${post.age}`}
        subheader={new Date(post.created_at).toDateString()}
      />
      <CardMedia className={classes.media} image={dogImg} title={post.name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
}
