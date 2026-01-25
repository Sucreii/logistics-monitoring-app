import type { RouteRecordRaw } from 'vue-router'

export const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    // component: () => import('src/layouts/MainLayout.vue'),
    redirect: { name: 'auth.page' },
    children: [
      {
        path: '',
        name: 'auth.page',
        component: () => import('src/pages/IndexPage.vue'),
      },
    ],
  },
]
