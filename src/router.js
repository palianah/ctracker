import Vue from "vue"
import VueRouter from "vue-router"

import store from './store'

import WelcomePage from "./components/welcome/welcome.vue"
import SignupPage from "./components/auth/signup.vue"
import SigninPage from "./components/auth/signin.vue"
import DailyPage from "./components/daily/daily.vue"

Vue.use(VueRouter)

const routes = [
  { path: "/", component: WelcomePage },
  {
    path: "/signup",
    component: SignupPage,
    beforeEnter (to, from, next) {
      if(store.state.idToken) {
        next("/")
      } else {
        next()
      }
    }
  },
  {
    path: "/signin",
    component: SigninPage,
    beforeEnter (to, from, next) {
      if(store.state.idToken) {
        next("/")
      }else {
        next()
      }
    }
  },
  {
    path: "/daily",
    component: DailyPage,
    beforeEnter (to, from, next) {
      if(store.state.idToken) {
        next()
      } else {
        next("/signin")
      }
    }
  }
]

export default new VueRouter({mode: "history", routes})
