import axios from '../../axios-auth'
import globalAxios from 'axios'

import router from '../../router'

const state = {
  funds: 5000,
  spendCategories: [],
  earnCategories: [],
  SpendMoney: [],
  EarnMoney: []
}

const mutations = {
  SAVE_FUNDS (state, funds) {
    state.funds = funds;
  }
}

const actions = {
  storeFund ({ commit, state, rootState }, funds) {
    if (!rootState.auth.idToken) {
      return
    }
    let sendFunds = [{funds: funds}]
    globalAxios.post('/users.json' + '?auth=' + rootState.auth.idToken, sendFunds)
      .then(res => {
        console.log(res)
        commit("SAVE_FUNDS", funds);
      })
      .catch(error => console.log(error))
  }
}

const getters = {
  getUserData (state) {
    return state
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
