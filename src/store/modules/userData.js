import axios from '../../axios-auth'
import globalAxios from 'axios'

import router from '../../router'

const state = {
  funds: 5000,
  spendCategories: [
    {
      food: ["mensa", "einkaufen", "trinken"]
    },
    {
      sport: ["bowling", "fitness"]
    }
  ],
  SpendMoney: [
    {
      description:"BowlingCenter Schillerpark",
      costs: "12.00",
      date: "2108.03.12",
      time: "12:52",
      category: "sport/bowling"
    },
    {
      description:"Mensa Nord",
      costs: "15.55",
      date: "2108.03.11",
      time: "09:52",
      category: "food/mensa"
    },
    {
      description:"Lidl einkaufen",
      costs: "39.99",
      date: "2108.03.15",
      time: "15:52",
      category: "food/einkaufen"
    }
  ],
  earnCategories: [],
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
