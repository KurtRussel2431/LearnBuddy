// Auth Views
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import TutorRegisterView from '@/views/auth/TutorRegisterView.vue'

// System Views
import DashboardView from '@/views/system/DashboardView.vue'

import TutorsView from '@/views/system/TutorsView.vue'
import BookingView from '@/views/system/BookingView.vue'
import SessionsView from '@/components/system/bookings/SessionsView.vue'
import AccountSettingsView from '@/views/system/AccountSettingsView.vue'
import AdminView from '@/views/system/AdminView.vue'

export const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      public: true,
      authRedirect: '/dashboard', // Add this to specify where to redirect authenticated users
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      public: true,
      authRedirect: '/dashboard',
    },
  },
  {
    path: '/tutor-register',
    name: 'tutor-register',
    component: TutorRegisterView,
    meta: {
      public: true,
    },
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/tutors',
    name: 'tutors',
    component: TutorsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: BookingView,
    meta: { requiresAuth: true },
  },
  {
    path: '/sessions',
    name: 'sessions',
    component: SessionsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/account/settings',
    name: 'account-settings',
    component: AccountSettingsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
]
