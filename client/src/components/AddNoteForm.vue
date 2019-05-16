<template>
  <div class="hello">
    <b-container>
      <b-row>
        <b-col md="4" offset-md="4">
          <div>
            <b-row>
              <b-form-input v-model="title" placeholder="Enter note title"></b-form-input>
            </b-row>
            <b-row>
              <b-form-input v-model="text" placeholder="Enter note text"></b-form-input>
            </b-row>
            <b-form-select v-model="status" :options="options"></b-form-select>
            <b-row>
              <b-button @click="createNote" variant="outline-primary">Create note</b-button>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as actionTypes from '../store/action-types';

export default {
  name: 'AddNoteForm',
  data() {
    return {
      text: '',
      title: '',
      status: null,
        options: [
          { value: null, text: 'Please select note type' },
          { value: 'to do', text: 'To do' },
          { value: 'in progress', text: 'In progress' },
          { value: 'done', text: 'Done' },
        ]
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
    }),
  },
  methods: {
    ...mapActions('notes', {
      createNoteAPI: actionTypes.CREATE_NOTE,
    }),
    createNote() {
      this.createNoteAPI({
        noteParams: {
          title: this.title,
          text: this.text,
          status: this.status,
        }, 
        token: this.token
      });
    }
  }
};
</script>