import { createRouter, createWebHistory } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthUserStore()

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    const isAuthenticated = await authStore.isAuthenticated()

    if (!isAuthenticated) {
      next('/')
      return
    }

    // Check if route requires admin role
    if (to.meta.requiresAdmin) {
      const userRole = authStore.userData?.role?.toLowerCase()
      if (userRole !== 'admin') {
        next('/dashboard')
        return
      }
    }
  }

  // Redirect authenticated users away from login page
  if (to.meta.public && to.meta.authRedirect) {
    const isAuthenticated = await authStore.isAuthenticated()
    if (isAuthenticated) {
      next(to.meta.authRedirect)
      return
    }
  }

  next()
})

export default router
