<template>
  <div class="hello">
    <notifications group="notifications" />
    <b-container>
      <b-row>
        <b-col md="4" offset-md="4">
          <div>
            <b-row>
              <b-form-input v-model="username" placeholder="Enter your username"></b-form-input>
            </b-row>
            <b-row>
              <b-form-input v-model="password" placeholder="Enter your password"></b-form-input>
            </b-row>
            <b-row>
              <b-button @click="createUser" variant="outline-primary">Create user</b-button>
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
  name: 'HelloWorld',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('user', {
      creteUserAPI: actionTypes.CREATE_USER,
    }),
    createUser() {
      this.creteUserAPI({
        username: this.username,
        password: this.password,
      }).then(({ token }) => {
        if (token) {
          this.$router.push({ path: 'notes' })
        }
      })
      .catch(error => {
        console.log('error', error);
      })
    }
  }
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
