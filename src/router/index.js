import { createRouter, createWebHistory } from 'vue-router'
import SessionView from '../views/SessionView.vue'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import SessionLayout from '../layouts/SessionLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView
        }
      ]
    },
    {
      path: '/session/:sessionName',
      component: SessionLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'session',
          component: SessionView
        }
      ]
    },
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: LoginView
        }
      ]
    },
    {
      path: '/register',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'register',
          component: RegistrationView
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth) {
    const isAuthenticated = authStore.isLoggedIn()
    if (!isAuthenticated) {
      return next('/login')
    }
  }
  next()
})

export default router
