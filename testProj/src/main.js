// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css'
import { WeekDays} from "./lib/Constants";

export  const baseUrl = process.env.NODE_ENV === 'development' ? '/api' : '/'
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$http = axios;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
