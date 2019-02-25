import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Survivor from './views/Survivor.vue'
import Killer from './views/Killer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/survivor',
      name: 'survivor',
      component: Survivor
    },
    {
      path: '/killer',
      name: 'killer',
      component: Killer
    }
  ]
})
