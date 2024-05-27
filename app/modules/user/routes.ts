import router from "@adonisjs/core/services/router";
import UserController from "./controllers/index.js";
import { middleware } from "#start/kernel";

export const UserRoutes = () => {
    router.post('/users', [UserController, 'store']);
    router.post('/login', [UserController, 'login']);
    router.get('/users/:id', [UserController, 'show']).use(middleware.auth({ guards: ['api'] }));;
    router.put('/users/:id', [UserController, 'update']).use(middleware.auth({ guards: ['api'] }));;
    router.get('/validate-token', [UserController, 'validate']).use(middleware.auth({ guards: ['api'] }));
    router.get('/user-by-token', [UserController, 'getUserByToken']).use(middleware.auth({ guards: ['api'] }));
}