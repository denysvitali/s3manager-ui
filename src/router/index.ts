import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/buckets',
      name: 'buckets',
      component: () => import('../views/BucketsView.vue')
    },
    {
      path: '/buckets/:bucket',
      name: 'bucket-view',
      component: () => import('../views/BucketView.vue')
    },
    {
      path: '/buckets/:bucket/:path(.*)',
      name: 'bucket-path-view',
      component: () => import('../views/BucketView.vue')
    },
  ]
})

export default router
