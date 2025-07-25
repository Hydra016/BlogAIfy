import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    { path: '/home', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/my-posts', name: 'my-posts', component: () => import('../views/MyPostsView.vue'), meta: { requiresAuth: true } },
    { path: '/create', name: 'create', component: () => import('../views/CreateView.vue'), meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
    {
      path: '/blogs/:id',
      name: 'blog',
      component: () => import('@/views/SingleBlog.vue'),
      props: true,
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const { useUserStore } = await import('../stores/userStore')
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/home')
  } else {
    next()
  }
})

export default router
