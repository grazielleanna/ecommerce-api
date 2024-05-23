import router from "@adonisjs/core/services/router";
import ProductControllers from "./controllers/index.js";

export const ProductRoutes = () => {
    router.resource('/products', ProductControllers).apiOnly();
}