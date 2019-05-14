import request from '../utils/request';

const createNote = (noteParams, token) => request('/notes', 'post', noteParams, token);

const getUserNotes = userId => request(`/notes/users/${userId}`, 'get', userId);

const deleteNote = (noteId, token) => request(`/notes/${noteId}`, 'delete', noteId, token);

const updateNote = (noteId, noteParams, token) => request(`/notes/${noteId}`, 'put', noteParams, token);

export default {
  createNote,
  getUserNotes,
  deleteNote,
  updateNote,
};
