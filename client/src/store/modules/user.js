import userAPI from '../../api/user';
import * as actionTypes from '../action-types';
import * as mutationTypes from '../mutation-types';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
};

const getters = {};

const actions = {
  async [actionTypes.CREATE_USER]({ commit }, userParams) {
    return new Promise(async (resolve) => {
      const userInfo = await userAPI.createUser(userParams);
      commit(mutationTypes.SET_USER, userInfo);
      resolve(userInfo);
    });
  },
};

const mutations = {
  [mutationTypes.SET_USER](state, userInfo) {
    const { user, token } = userInfo;
    state.user = user;
    state.token = token;
    localStorage.setItem('token', token);
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
