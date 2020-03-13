import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './modules/userStore'
import dataStore from './modules/dataStore'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
    dataStore
  }
})
