// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import './assets/css/main.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/user-circle'


// 路由跳转
Vue.use(VueRouter);
// ajax
Vue.use(VueAxios, axios);
// 图标
Vue.component('icon', Icon);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
