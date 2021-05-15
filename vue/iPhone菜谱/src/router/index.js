import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/',name:'Foods', component: () => import('../views/Foods.vue') },
  { path: '/detail',name:'Details', component: () => import('../views/Details.vue') }
]

const router = new VueRouter({
  routes
})

export default router
