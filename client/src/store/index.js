import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import notes from './modules/notes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    notes,
  },
});
