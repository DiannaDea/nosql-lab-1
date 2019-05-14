import notesAPI from '../../api/notes';
import * as actionTypes from '../action-types';
import * as mutationTypes from '../mutation-types';

const initialState = {
  all: [],
};

const getters = {};

const actions = {
  async [actionTypes.GET_USER_NOTES]({ commit }, userId) {
    return new Promise(async (resolve) => {
      const notes = await notesAPI.getUserNotes(userId);
      commit(mutationTypes.SET_USER_NOTES, notes);
      resolve(notes);
    });
  },
  async [actionTypes.CREATE_NOTE]({ commit }, { noteParams, token }) {
    return new Promise(async (resolve) => {
      const note = await notesAPI.createNote(noteParams, token);
      commit(mutationTypes.ADD_NOTE, note);
      resolve(note);
    });
  },
  async [actionTypes.UPDATE_NOTE]({ commit }, { noteId, noteParams, token }) {
    return new Promise(async (resolve) => {
      await notesAPI.updateNote(noteId, noteParams, token);
      commit(mutationTypes.UPDATE_NOTE, { noteId, noteParams });
      resolve(noteId);
    });
  },
  async [actionTypes.DELETE_NOTE]({ commit }, { noteId, token }) {
    return new Promise(async (resolve) => {
      await notesAPI.deleteNote(noteId, token);
      commit(mutationTypes.REMOVE_NOTE, noteId);
      resolve(noteId);
    });
  },
};

const mutations = {
  [mutationTypes.SET_USER_NOTES](state, notes) {
    state.all = notes;
  },
  [mutationTypes.ADD_NOTE](state, note) {
    state.all = [
      ...state.all,
      note,
    ];
  },
  [mutationTypes.UPDATE_NOTE](state, { noteId, noteParams }) {
    state.all = state.all.map((note) => {
      if (note._id === noteId) {
        return {
          ...note,
          ...noteParams,
        }
        ;
      }
      return note;
    });
  },
  [mutationTypes.REMOVE_NOTE](state, noteId) {
    state.all = state.all.filter(note => note._id !== noteId);
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
