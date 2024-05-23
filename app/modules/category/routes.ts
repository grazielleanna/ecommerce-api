import router from "@adonisjs/core/services/router"
import CategoryController from "./controllers/index.js"

export const CategoryRoutes = () => {
    router.resource('/categories', CategoryController).apiOnly();
}