import router from "@adonisjs/core/services/router"
import CategoryController from "./controllers/index.js"
import { middleware } from "#start/kernel";

export const CategoryRoutes = () => {
    router.post('/categories', [CategoryController, 'store']).use(middleware.auth({ guards: ['api'] }))
    router.put('/categories/:id', [CategoryController, 'update']).use(middleware.auth({ guards: ['api'] }))
    router.delete('/categories/:id', [CategoryController, 'destroy']).use(middleware.auth({ guards: ['api'] }))
    router.get('/categories/:id', [CategoryController, 'show'])
    router.get('/categories', [CategoryController, 'index'])
}