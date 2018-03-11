import Vue from "vue"
import VueRouter from "vue-router"

import store from './store/store'

import WelcomePage from "./components/welcome/welcome.vue"
import SignupPage from "./components/auth/signup.vue"
import SigninPage from "./components/auth/signin.vue"
import AccountsPage from "./components/accounts/accounts.vue"
import StatsPage from "./components/stats/stats.vue"
import SettingsPage from "./components/settings/settings.vue"
import CalendarPage from "./components/calendar/calendar.vue"
import CalendarAddPage from "./components/calendar/calendar_add.vue"
import CalendarEditPage from "./components/calendar/calendar_edit.vue"

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
    children: [
      {
        path: "/", component: CalendarPage
      },
      {
        path: "/add", component: CalendarAddPage
      },
      {
        path: "/edit", component: CalendarEditPage
      }
    ],
    beforeEnter (to, from, next) {
      if(store.state.auth.idToken) {
        next()
      } else {
        next()
        //next("/signin")
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
  },
  {
    path: "/stats",
    component: StatsPage,
    beforeEnter (to, from, next) {
      console.log(store)
      if(store.state.auth.idToken) {
        next()
      } else {
        next("/signin")
      }
    }
  },
  {
    path: "/settings",
    component: SettingsPage,
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
