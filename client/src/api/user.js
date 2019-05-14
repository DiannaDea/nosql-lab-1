import request from '../utils/request';

const createUser = userParams => request('/users', 'post', userParams);

const getUsers = () => request('/users', 'get');

const updateUser = userId => request(`/users/${userId}`, 'put', userId);

const changePassword = userId => request(`/users/${userId}/change-password`, 'put', userId);

export default {
  createUser,
  getUsers,
  updateUser,
  changePassword,
};
