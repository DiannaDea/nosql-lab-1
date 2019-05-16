<template>
  <b-container class="control-panel">
     <b-row>
       <b-col>
          <b-form-group
            id="sort-label"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Sort:"
            label-for="sort"
          >
            <b-form-select 
              id="sort" 
              v-model="selectedSort"
              @change="setSort"
              :options="sortOptions"></b-form-select>
          </b-form-group>
       </b-col>
       <b-col>
          <b-form-group
            id="filter-label"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Filter:"
            label-for="filter"
          >
            <b-form-select 
              id="filter" 
              @change="setFilter"
              v-model="filter" 
              :options="filterOptions"></b-form-select>
          </b-form-group>
       </b-col>
       <b-col>
          <b-form-group
            id="search-label"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Search:"
            label-for="search"
          >
            <b-form-input @change="setSearch" id="searchl"></b-form-input>
          </b-form-group>
       </b-col>
       <b-col>
         <b-button @click="clear" variant="outline-primary">Clear</b-button>
       </b-col>
     </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'ControlPanel',
  data() {
    return {
      sortOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'title-asc', text: 'Title - ASC' },
        { value: 'title-desc', text: 'Title - DESC' },
        { value: 'text-asc', text: 'Text - ASC' },
        { value: 'text-desc', text: 'Text - DESC' },
      ],
      filterOptions: [
        { value: null, text: 'Please select note type' },
        { value: 'to do', text: 'To do' },
        { value: 'in progress', text: 'In progress' },
        { value: 'done', text: 'Done' },
      ]
    }
  },
  methods: {
    setFilter(type) {
      this.$emit('changeFilter', type);
    },
    setSort(key) {
      this.$emit('changeSort', key);
    },
    setSearch(key) {
      this.$emit('changeSearch', key);
    },
    clear() {
      this.$emit('clearFields');
    },
  }
}
</script>

<style>
  .control-panel {
    padding: 50px 0;
  }
</style>
