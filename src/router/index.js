import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import BlogLayout from '../layouts/BlogLayout.vue'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: Home },
    ],
  },
  {
    path: '/blog',
    component: BlogLayout,
    children: [
      {
        path: '',
        name: 'blog-list',
        component: () => import('@/features/blog/views/BlogList.vue'),
      },
      {
        path: ':slug',
        name: 'blog-post',
        component: () => import('@/features/blog/views/BlogPost.vue'),
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router