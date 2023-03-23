import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import IndexView from '../views/IndexView.vue'
import SearchComponent from '../views/SearchComponent.vue'
import PackageComponent from '../views/PackageComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/index',
    name: 'index',
    component: IndexView,
    children: [
      {
        path: '/index',
        name: 'searchindex',
        component: SearchComponent
      },
      {
        path: '/index/search',
        name: 'searchall',
        component: SearchComponent
      },
      {
        path: '/index/search/:search',
        name: 'search',
        props: true,
        component: SearchComponent
      },
      {
        path: '/index/pkg/:name',
        name: 'package',
        props: true,
        component: PackageComponent
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
