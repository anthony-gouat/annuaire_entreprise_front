import { createStore } from 'vuex'

export default createStore({
  state: {
    utilisateur:undefined,
  },
  getters: {
    getUtilisateur(state){
      return state.utilisateur;
    },
  },
  mutations: {
    setUtilisateur(state,val){
      state.utilisateur=val
    },
  },
  actions: {
  },
  modules: {
  }
})
