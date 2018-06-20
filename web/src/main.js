// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui';
import store from './store'

import './assets/bootstrap.css'
import './assets/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';


import App from './App'
import router from './router'

var VueCookie = require('vue-cookie');

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(ElementUI);
Vue.use(VueCookie);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
