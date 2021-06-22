import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import About from '../views/About.vue'
import Account from '../views/Account.vue'

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
