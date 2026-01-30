import type { RouteRecordRaw } from 'vue-router';

export const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: 'login',
        name: 'auth.page',
        component: () => import('src/pages/IndexPage.vue'),
      },
    ],
  },
];
