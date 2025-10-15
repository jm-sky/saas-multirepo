import { useIsAuthenticated } from 'vue-core'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  // Auth routes
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/pages/auth/LoginPage.vue'),
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/pages/auth/RegisterPage.vue'),
  },
  {
    path: '/auth/forgot-password',
    name: 'forgot-password',
    component: () => import('@/pages/auth/ForgotPasswordPage.vue'),
  },
  {
    path: '/auth/reset-password',
    name: 'reset-password',
    component: () => import('@/pages/auth/ResetPasswordPage.vue'),
  },
  // Protected routes
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/DashboardPage.vue'),
    beforeEnter: (to, from, next) => {
      const { isAuthenticated } = useIsAuthenticated()
      if (!isAuthenticated.value) {
        next('/auth/login')
      } else {
        next()
      }
    },
  },
  // Legacy redirect for old /login path
  {
    path: '/login',
    redirect: '/auth/login',
  },
]
