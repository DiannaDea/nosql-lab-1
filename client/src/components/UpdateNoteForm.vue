<template>
  <div class="hello">
    <b-container>
      <b-row>
        <b-col md="4" offset-md="4">
          <div>
            <b-row>
              <b-form-input
                v-model="note.title" 
                placeholder="Enter note title" 
                @input="changeTitle"></b-form-input>
            </b-row>
            <b-row>
              <b-form-input 
                v-model="note.text" 
                placeholder="Enter note text"
                @input="changeText"></b-form-input>
            </b-row>
            <b-row>
              <b-button @click="updateNote" variant="outline-primary">Update note</b-button>
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
  name: 'UpdateNoteForm',
  data() {
    return {
      text: '',
      title: '',
    };
  },
  props: {
    note: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
    }),
  },
  methods: {
    ...mapActions('notes', {
      updateNoteAPI: actionTypes.UPDATE_NOTE,
    }),
    updateNote() {
      this.updateNoteAPI({
        noteId: this.note._id,
        noteParams: {
          title: (this.title.length) ? this.title : this.note.title,
          text: (this.text.length) ? this.text : this.note.text,
        }, 
        token: this.token
      })
    },
    changeText(value) {
      this.text = value;
    },
    changeTitle(value) {
      this.title = value;
    }
  }
};
</script>