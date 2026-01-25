import type { RouteRecordRaw } from 'vue-router'
import { AuthRoutes } from 'src/router/auth/index'
import { HomeRoutes } from 'src/router/home/index'

const routes: RouteRecordRaw[] = []

routes.push(...AuthRoutes)
routes.push(...HomeRoutes)

routes.push({
  path: '/:catchAll(.*)*',
  component: () => import('pages/ErrorNotFound.vue'),
})

export default routes
