import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Receptionist/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: ()=> import('../views/Login.vue')
  },
  {
    path: '/reception',
    name: 'Receptionist',
    component: Dashboard,
    // meta: { requiresAuth: true, role: 'receptionist' },
  },
  {
    path: '/BookAppointment',
    name: 'Appointment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Receptionist/Appointment.vue'),
    // meta: { requiresAuth: true, role: 'receptionist' },
  },
  {
    path: '/registeredPatients',
    name: 'Registered_Patients',
    component: () => import(/* webpackChunkName: "about" */ '../views/Receptionist/RegisteredPatients.vue'),
    // meta: { requiresAuth: true, role: 'receptionist' },
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import(/* webpackChunkName: "about" */ '../views/Receptionist/Transactions.vue'),
    // meta: { requiresAuth: true, role: 'receptionist' },
  },
  {
    path: '/ViewAppointments',
    name: 'Appointments',
    component: () => import(/* webpackChunkName: "about" */ '../views/Receptionist/ViewAppointments.vue'),
    // meta: { requiresAuth: true, role: 'receptionist' },
  },
  {
    path: '/doctor',
    name: 'doctor',
    component: () => import(/* webpackChunkName: "about" */ '../views/doctor/Dashboard.vue'),
    // meta: { requiresAuth: true, role: 'doctor' },
  },
  {
    path: '/doctor/appointment/:id',
    name: 'Booking',
    component: () => import(/* webpackChunkName: "about" */ '../views/doctor/Booking.vue'),
    // meta: { requiresAuth: true, role: 'doctor' },
  },  
  {
    path: '/pharmacist',
    name: 'Pharmacist',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pharmacist/Dashboard.vue'),
    // meta: { requiresAuth: true, role: 'pharmacist' },
  },
  {
    path: '/pharmacist/medicine',
    name: 'Medicine',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pharmacist/Medicine.vue'),
    // meta: { requiresAuth: true, role: 'pharmacist' },
  },
  {
    path: '/laboratory',
    name: 'Laboratory',
    component: () => import(/* webpackChunkName: "about" */ '../views/Laboratory/Dashboard.vue'),
    // meta: { requiresAuth: true, role: 'lab_technician' },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

  router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    if (to.matched.some((route) => route.meta.requiresAuth)) {
      // Check if the route requires authentication
      if (isAuthenticated) {
        // Check if the user has the required role
        if (to.meta.role === userRole) {
          next(); // Allow access
        } else {
          // Redirect to unauthorized page or handle accordingly
          next('/');
        }
      } else {
        // Redirect to login page if not authenticated
        next('/');
      }
    } else {
      next(); // Allow access for public routes
    }
  });

export default router
