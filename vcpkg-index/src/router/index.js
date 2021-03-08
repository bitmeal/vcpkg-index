import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import Package from '../views/Package.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Search
  },
  {
    path: '/search',
    name: 'searchall',
    component: Search
  },
  {
    path: '/search/:search',
    name: 'search',
    props: true,
    component: Search
  },
  {
    path: '/pkg/:name',
    name: 'package',
    props: true,
    component: Package
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
