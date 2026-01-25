import type { RouteRecordRaw } from 'vue-router'

export const HomeRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('src/components/LeftDrawer.vue'),
    redirect: { name: 'home.layout' },
    children: [
      {
        path: '',
        name: 'home.dashboard',
        component: () => import('src/pages/HomePage.vue'),
      },
      // {
      //   path: '/order-list',
      //   name: 'home.order-list',
      //   component: () => import('src/modules/home/pages/order-list.vue'),
      // },
      // {
      //   path: '/shipment-list',
      //   name: 'home.shipment-list',
      //   component: () => import('src/modules/home/pages/shipment-list.vue'),
      // },
      // {
      //   path: '/reports',
      //   name: 'home.reports',
      //   component: () => import('src/modules/home/pages/reports.vue'),
      // },
      // {
      //   path: '/notifications',
      //   name: 'home.notifications',
      //   component: () => import('src/modules/home/pages/notification.vue'),
      // },
      // {
      //   path: '/add-user',
      //   name: 'home.add-user',
      //   component: () => import('src/modules/home/pages/add-user.vue'),
      // },
      // {
      //   path: '/modify-user',
      //   name: 'home.modify-user',
      //   component: () => import('src/modules/home/pages/modify-users.vue'),
      // },
    ],
  },
]
