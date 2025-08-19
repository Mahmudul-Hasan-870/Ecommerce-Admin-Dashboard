import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { canAccess } from '../utils/permissions'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/DashboardHome.vue'),
        meta: { permission: 'dashboard' }
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/Products.vue'),
        meta: { permission: 'products' }
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('../views/Categories.vue'),
        meta: { permission: 'categories' }
      },
      {
        path: 'banners',
        name: 'Banners',
        component: () => import('../views/Banners.vue'),
        meta: { permission: 'banners' }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/Orders.vue'),
        meta: { permission: 'orders' }
      },
      {
        path: 'customers',
        name: 'Customers',
        component: () => import('../views/Customers.vue'),
        meta: { permission: 'customers' }
      },

      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue'),
        meta: { permission: 'settings' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // If user has token but no user data, try to fetch user data
  if (authStore.token && !authStore.user) {
    try {
      await authStore.checkAuth()
    } catch (error) {
      // If token is invalid, clear auth data
      await authStore.logout()
    }
  }
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
  } else if (to.meta.permission && !canAccess(to.meta.permission, authStore.user)) {
    // User doesn't have permission, redirect to dashboard
    next('/')
  } else {
    next()
  }
})

export default router 