// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VAnimateCss from 'v-animate-css';
import {reduxStorePlugin} from 'redux-vue'

import store from './store'


Vue.use(VAnimateCss);
Vue.use(reduxStorePlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
new Vue({
  // store: store,
  render(h) {
    return <App />
  }
}).$mount('#app')



