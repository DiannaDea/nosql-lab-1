<template>
  <div>
    <AddNoteForm />
    <NotesList :notes="notes"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import jwt from 'jsonwebtoken';
import * as actionTypes from '../store/action-types';
import NotesList from './NotesList';
import AddNoteForm from './AddNoteForm';

export default {
  name: 'NotesPage',
  data() {
    return {
      
    };
  },
  components: {
    NotesList,
    AddNoteForm,
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      notes: state => state.notes.all,
    }),
  },
  methods: {
    ...mapActions('notes', {
      getUserNotesAPI: actionTypes.GET_USER_NOTES,
    }),
    getUserNotes(userId) {
      this.getUserNotesAPI(userId)
        .then(notes => console.log('notes', notes));
    }
  },
  async created() {
    const { _id } = jwt.decode(this.token);

    this.getUserNotes(_id)
  },
};
</script>
