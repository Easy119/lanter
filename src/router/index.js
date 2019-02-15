import Vue from 'vue'
import Router from 'vue-router'
import Main from "@/pages/main.vue"
import userInfo from "@/pages/userInfo.vue"
import play from "@/pages/play.vue"
import result from "@/pages/result.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/info',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/play',
      name: 'play',
      component: play
    },
    {
      path: '/result',
      name: 'result',
      component: result
    }
  ]
})
