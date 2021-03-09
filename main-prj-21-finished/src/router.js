import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: () => import('./pages/coaches/CoachDetail.vue'),
      props: true,
      children: [
        {
          path: 'contact',
          component: () => import('./pages/requests/ContactCoach.vue')
        } // /coaches/c1/contact
      ]
    },
    {
      path: '/register',
      component: () => import('./pages/coaches/CoachRegistration.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/requests',
      component: () => import('./pages/requests/RequestsReceived.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      component: () => import('./pages/auth/UserAuth.vue'),
      meta: {
        requiresUnauth: true
      }
    },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
