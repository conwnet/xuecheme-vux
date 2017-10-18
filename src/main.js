// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import { AjaxPlugin, AlertPlugin } from 'vux'

import Home from './components/Home'
import CoachList from './components/CoachList'
import Coach from './components/Coach'
import Profile from './components/Profile'
import Login from './components/Login'
import Info from './components/Info'
import Course from './components/Course'
import Password from './components/Password'

Vue.use(VueRouter)
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)

const routes = [{
  path: '/',
  component: Home
}, {
  path: '/home',
  component: Home
}, {
  path: '/coaches',
  component: CoachList
}, {
  path: '/coaches/:id',
  component: Coach
}, {
  path: '/profile',
  component: Profile
}, {
  path: '/login',
  component: Login
}, {
  path: '/profile/info',
  component: Info
}, {
  path: '/course/:type',
  component: Course
}, {
  path: '/profile/password',
  component: Password
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.appHost = 'http://api.aimoma.com'

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
