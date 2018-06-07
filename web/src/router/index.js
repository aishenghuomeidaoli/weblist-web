import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import salary from '@/views/salary'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/tools/salary/',
      name: 'salary',
      component: salary
    },
  ],
})
