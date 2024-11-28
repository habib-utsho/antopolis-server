import { Router } from 'express'
import { categoryRouter } from '../module/category/category.route'
import { animalRouter } from '../module/animal/animal.route'

const router = Router()
const routes = [
  {
    path: '/category',
    route: categoryRouter,
  },
  {
    path: '/animal',
    route: animalRouter,
  },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
