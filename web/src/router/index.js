import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import salary from '@/views/salary'
import bus_monitor from '@/views/bus-monitor'

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
    {
      path: '/tools/bus-monitor/',
      name: 'bus-monitor',
      component: bus_monitor
    },
  ],
})
