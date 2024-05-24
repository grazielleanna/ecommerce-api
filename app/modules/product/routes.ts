import router from "@adonisjs/core/services/router";
import ProductControllers from "./controllers/index.js";
import { middleware } from "#start/kernel";

export const ProductRoutes = () => {
    router.post('/products', [ProductControllers, 'store']).use(middleware.auth({ guards: ['api'] }))
    router.put('/products/:id', [ProductControllers, 'update']).use(middleware.auth({ guards: ['api'] }))
    router.delete('/products/:id', [ProductControllers, 'destroy']).use(middleware.auth({ guards: ['api'] }))
    router.get('/products/:id', [ProductControllers, 'show'])
    router.get('/products', [ProductControllers, 'index'])
}