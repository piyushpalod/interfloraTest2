//import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { pc } from '../logic/pointcalc'

export default Vuex.createStore({
  state: {
    bpoints: [],
    btoken: '',
    bscore: [],
    postSuccess: {}
  },
  mutations: {
    UPDATE_BSCORES(state, payload) {
      state.bpoints = payload
      pc.calcPoints()
    },
    UPDATE_BTOKEN(state, payload) {
      state.btoken = payload
    },
    UPDATE_BSCORE(state, payload) {
      state.bscore = payload
    },
    UPDATE_RESPONSE(state, payload) {
      state.postSuccess = payload
    }
  },
  actions: {
    fetchPoints({ commit }) {
      axios.get('http://13.74.31.101/api/points')
      .then(function (response) {
        commit('UPDATE_BSCORES', response.data.points)
        commit('UPDATE_BTOKEN', response.data.token)
        commit('UPDATE_RESPONSE', false)
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    postScore({commit}){
      axios.post('http://13.74.31.101/api/points',{
        token: this.getters.getBToken,
        points: this.getters.getBScore
      })
      .then((response) => {
        commit('UPDATE_RESPONSE', {'success': response.data.success,'status':response.status})
      }, (error) => {
        commit('UPDATE_RESPONSE', {'success': error.response.data,'status':error.response.status})

      });
      
    }
  },
  getters: {
    getBPoints: state => state.bpoints.join(' - '),
    getBPointsRaw: state => state.bpoints,
    getBToken: state => state.btoken,
    getBScore: state => state.bscore,
    getSuccess: state => state.postSuccess
  }
})