
import Vue from 'vue'
import App from './App'
import router from './router'
import VAnimateCss from 'v-animate-css';
import {reduxStorePlugin} from 'redux-vue'

import store from './store'

Vue.use(VAnimateCss);
Vue.use(reduxStorePlugin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})




