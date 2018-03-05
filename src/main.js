import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'

import router from './router'
import store from './store/store'

Vue.use(Vuelidate)

Vue.filter("currency", (value) => {
  return value.toLocaleString() + " €"
})

axios.defaults.baseURL = "https://ctracker-ae2fd.firebaseio.com"

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
