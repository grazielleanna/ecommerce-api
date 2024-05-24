import router from "@adonisjs/core/services/router";
import UserController from "./controllers/index.js";

export const UserRoutes = () => {
    router.post('/users', [UserController, 'store']);
    router.post('/login', [UserController, 'login']);
}