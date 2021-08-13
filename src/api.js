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

const getAllPets = () => axios.get(`${API_URL}/pet/getAllPets`);

const deletePost = (id) => axios.post(`${API_URL}/post/removePost`, {
  id: id
});

const getDogPic = () => axios.get('https://dog.ceo/api/breeds/image/random');

const getPostById = (id) => axios.get(`${API_URL}/post/getPostById/${id}`);

const getAllComments = (post_id) => axios.get(`${API_URL}/comment/getCommentsByPostId/${post_id}`);

const addComment = (post_id, user_id, text) =>
  axios.post(`${API_URL}/comment/addComment`, {
    user_id: user_id,
    post_id: post_id,
    text: text
  });

const getPetById = (id) => axios.get(`${API_URL}/pet/getPetById/${id}`);

const getLikeByUserIdAndPostId = (uid, pid) => axios.get(`${API_URL}/like/getLikeByUserIdAndPostId/${uid}/${pid}`);

const getLikeByPostId = (pid) => axios.get(`${API_URL}/like/getLikeByPostId/${pid}`);

const deleteLike = (id) => axios.post(`${API_URL}/like/removeLike`, {
  id: id
});

const addLikes = (user_id, post_id) =>
  axios.post(`${API_URL}/like/addLike`, {
    user_id: user_id,
    post_id: post_id,
  });

const addPets = (breed, maintenance, aggression, energy) =>
  axios.post(`${API_URL}/pet/addPet`, {
    breed: breed,
    maintenance: maintenance,
    aggression: aggression,
    energy: energy,
  });

const addPosts = (user_id, pet_id, title, content, name, age) =>
  axios.post(`${API_URL}/post/addPost`, {
    user_id: user_id,
    pet_id: pet_id,
    title: title,
    content: content,
    name: name,
    age: age,
  });

export {
  login,
  logout,
  getAllPosts,
  getDogPic,
  getPostById,
  getAllComments,
  addComment,
  getPetById,
  deletePost,
  getLikeByUserIdAndPostId,
  deleteLike,
  addLikes,
  addPets,
  addPosts,
  getAllPets,
  getLikeByPostId
};
