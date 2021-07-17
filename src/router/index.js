import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login/index.vue'
import Dashboard from '../components/dashboard/index.vue'
import AddEvent from '../components/add-event/index.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/add-event',
    name: 'AddEvent',
    component: AddEvent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
