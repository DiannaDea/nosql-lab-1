<template>
  <div>
    <b-table 
      striped 
      hover
      show-empty
      :fields="fields"
      :items="notes">
        <template slot="actions" slot-scope="row">
          <b-button 
            size="sm" 
            class="mr-1" 
            variant="success"
            @click="updateNote(row.item._id, row.item, $event.target)">Update</b-button>
          <b-button 
            size="sm"
            variant="danger"
            @click="deleteNote(row.item._id)">Delete</b-button>
        </template>
      </b-table>
      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <UpdateNoteForm :note="noteToUpdate"/>
      </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import jwt from 'jsonwebtoken';
import * as actionTypes from '../store/action-types';
import UpdateNoteForm from './UpdateNoteForm';

export default {
  name: 'NotesList',
  components: {
    UpdateNoteForm,
  },
  data() {
    return {
      fields: [
        { key: '_id'},
        { key: 'title'},
        { key: 'text' },
        { key: 'status' },
        { key: 'actions', label: 'Actions' }
      ],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      noteToUpdate: null,
    };
  },
  props: {
    notes: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
    }),
  },
  methods: {
    ...mapActions('notes', {
      getUserNotesAPI: actionTypes.GET_USER_NOTES,
      deleteNoteAPI: actionTypes.DELETE_NOTE,
    }),
    getUserNotes(userId) {
      this.getUserNotesAPI(userId);
    },
    updateNote(noteId, note, button) {
      this.noteToUpdate = note;
      this.infoModal.title = `noteId: ${noteId}`
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
    deleteNote(noteId) {
      this.deleteNoteAPI({
        noteId,
        token: this.token,
      })
    },
  },
};
</script>
