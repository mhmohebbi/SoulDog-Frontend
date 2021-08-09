/* eslint-disable */

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const login = (form) =>
  axios.post(`${API_URL}/user/login`, { username: form.email, password: form.password });

const logout = () => {
  localStorage.removeItem('souldog-user');
  localStorage.setItem('souldog-isauth', false);
  return axios.get(`${API_URL}/user/logout`);
};

const getAllPosts = () => axios.get(`${API_URL}/post/getAllPosts`);

const getDogPic = () => axios.get('https://dog.ceo/api/breeds/image/random');

const getPostById = (id) => axios.get(`${API_URL}/post/getPostById/${id}`);

const getAllComments = (post_id) => axios.get(`${API_URL}/comment/getCommentsByPostId/${post_id}`);

const addComment = (post_id, user_id, text) =>
  axios.post(`${API_URL}/comment/addComment`, {
    user_id: user_id,
    post_id: post_id,
    text: text
  });

export { login, logout, getAllPosts, getDogPic, getPostById, getAllComments, addComment };
