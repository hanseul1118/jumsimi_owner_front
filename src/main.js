// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import { store } from './store/store'
import axios from 'axios'
import API from '@/api/api.js'


Vue.prototype.$http = axios
Vue.prototype.$api = API

Vue.config.productionTip = false
Vue.config.silent = false /* true: 로그, 경고 출력 안함 */

new Vue({
  render: h => h(App),
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
