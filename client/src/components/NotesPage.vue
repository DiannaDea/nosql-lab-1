<template>
  <div>
    <AddNoteForm />
    <ControlPanel 
      @changeSort="changeSort" 
      @changeFilter="changeFilter" 
      @changeSearch="changeSearch"
      @clearFields="clearFields"/>
    <NotesList :notes="notes"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import jwt from 'jsonwebtoken';
import * as actionTypes from '../store/action-types';
import NotesList from './NotesList';
import AddNoteForm from './AddNoteForm';
import ControlPanel from './ControlPanel';

export default {
  name: 'NotesPage',
  data() {
    return {
      selectedSearch: null,
      selectedSort: null,
      selectedFilter: null,
    };
  },
  components: {
    NotesList,
    AddNoteForm,
    ControlPanel,
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
      this.getUserNotesAPI(userId);
    },
    clearFields() {
      console.log('fkjfk')
      const { _id } = jwt.decode(this.token);

      this.selectedSort = null;
      this.selectedFilter = null;
      this.selectedSearch = null;
      
      this.getUserNotes({
        userId: _id,
      });
    },
    changeSort(value) {
      this.selectedSort = value;
      this.manageNotes();
    },
    changeFilter(value) {
      this.selectedFilter = value;
      this.manageNotes();
    },
    changeSearch(value) {
      this.selectedSearch = value;
      this.manageNotes();
    },
    getSort() {
      if (this.selectedSort) {
        const [field, order] = this.selectedSort.split('-');
        return {
          field,
          order: (order === 'asc') ? 1 : -1
        };
      }
      return null;
    },
    getFilter() {
      if (this.selectedFilter) {
        return {
          status: this.selectedFilter,
        };
      }
      return null;
    },
    getSearch() {
      if (this.selectedSearch) {
        return {
          text: this.selectedSearch,
        };
      }
      return null;
    },
    manageNotes() {
      const { _id } = jwt.decode(this.token);

      const sort = this.getSort();
      const filter = this.getFilter();
      const search = this.getSearch();

      this.getUserNotes({
        userId: _id,
        sort: (sort) ? sort : null,
        filter: (filter) ? filter : null,
        search: (search) ? search : null,
      });
    }
  },
  async created() {
    const { _id } = jwt.decode(this.token);

    this.getUserNotes({
      userId: _id,
    });
  },
};
</script>
