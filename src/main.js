import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'lib-flexible/flexible.js'
// 引入moment
import moment from 'moment'
Vue.prototype.$moment = moment

// 引入 Vant 组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 引入公共样式
import ("./assets/css/index.scss")
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
