import type { RouteRecordRaw } from 'vue-router';

export const HomeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/components/LeftDrawer.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'home.dashboard',
        component: () => import('src/pages/HomePage.vue'),
      },
      {
        path: '/shipments',
        name: 'home.shipments',
        component: () => import('src/pages/ForShipments.vue'),
      },
      {
        path: '/trips',
        name: 'home.trips',
        component: () => import('src/pages/ForTrips.vue'),
      },
      {
        path: '/users',
        name: 'home.users',
        component: () => import('src/pages/ForUsers.vue'),
      },
    ],
  },
];
