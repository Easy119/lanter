import Vue from 'vue'
import Router from 'vue-router'
import Main from "@/pages/main.vue"
import userInfo from "@/pages/userInfo.vue"
import play from "@/pages/play.vue"
import result from "@/pages/result.vue"
import question from "@/pages/questionnaire.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'question',
      component: question
    },
    // {
    //   path: '/info',
    //   name: 'userInfo',
    //   component: userInfo
    // },
    // {
    //   path: '/play',
    //   name: 'play',
    //   component: play
    // },
    // {
    //   path: '/result',
    //   name: 'result',
    //   component: result
    // },
    // {
    //   path: '/question',
    //   name: 'question',
    //   component: question
    // }
  ]
})
