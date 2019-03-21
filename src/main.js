// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 第一个是videoJs的样式，后一个是vue-video-player的样式，因为考虑到我其他业务组件可能也会用到视频播放，所以就放在了main.js内
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
//在main.js内
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);
import {Button,RadioGroup, Radio,cellGroup,cell,Notify,Dialog,Checkbox, CheckboxGroup ,ImagePreview  } from 'vant';
import axios from "axios"
Vue.use(Button).use(RadioGroup).use(Radio).use(cellGroup).use(cell).use(Notify ).use(Dialog).use(Checkbox).use(CheckboxGroup).use(ImagePreview);
Vue.config.productionTip = false
Vue.use(axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
