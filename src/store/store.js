import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios-auth'
import globalAxios from 'axios'

import router from '../router'

import auth from "./modules/auth"
import userData from "./modules/userData"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    userData
  }
})
