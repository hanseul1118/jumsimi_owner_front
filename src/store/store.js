import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    beforePage: 'Main'
  , userInfo: {
      token: '',
      userId: '',
    }
  , loading: false
  , favoriteList: []
  },
  // 동기 처리로 state 값을 처리할 경우
  actions: {
  },
  // 비동기 처리로 state 값을 처리할 경우
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))));
      }
    }
   , changeloading(state, flag) {
      state.loading = flag
    }
  , setBeforePage(state, pageName){
      state.beforePage = pageName
    }
  , addFavoriteRes(state, menuId) {
      state.favoriteList.push(menuId);
    }
  , deleteFavoriteRes(state, menuId) {
      state.favoriteList.splice(state.favoriteList.indexOf(menuId), 1);
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
})
