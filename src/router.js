import Vue from "vue"
import VueRouter from "vue-router"

import store from './store/store'

import WelcomePage from "./components/welcome/welcome.vue"
import SignupPage from "./components/auth/signup.vue"
import SigninPage from "./components/auth/signin.vue"
import CalendarPage from "./components/calendar/calendar.vue"
import AccountsPage from "./components/accounts/accounts.vue"

Vue.use(VueRouter)

const routes = [
  { path: "/", component: WelcomePage },
  {
    path: "/signup",
    component: SignupPage,
    beforeEnter (to, from, next) {
      if(store.state.auth.idToken) {
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
      if(store.state.auth.idToken) {
        next("/")
      }else {
        next()
      }
    }
  },
  {
    path: "/calendar",
    component: CalendarPage,
    beforeEnter (to, from, next) {
      if(store.state.auth.idToken) {
        next()
      } else {
        next("/signin")
      }
    }
  },
  {
    path: "/accounts",
    component: AccountsPage,
    beforeEnter (to, from, next) {
      console.log(store)
      if(store.state.auth.idToken) {
        next()
      } else {
        next("/signin")
      }
    }
  }
]

export default new VueRouter({mode: "history", routes})
