// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button,RadioGroup, Radio,cellGroup,cell,Notify,Dialog } from 'vant';
import axios from "axios"
Vue.use(Button).use(RadioGroup).use(Radio).use(cellGroup).use(cell).use(Notify ).use(Dialog);
Vue.config.productionTip = false
Vue.use(axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
