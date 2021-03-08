import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Index from '../views/Index.vue'
import Search from '../views/Search.vue'
import Package from '../views/Package.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/index',
        name: 'searchindex',
        component: Search
      },
      {
        path: '/index/search',
        name: 'searchall',
        component: Search
      },
      {
        path: '/index/search/:search',
        name: 'search',
        props: true,
        component: Search
      },
      {
        path: '/index/pkg/:name',
        name: 'package',
        props: true,
        component: Package
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
