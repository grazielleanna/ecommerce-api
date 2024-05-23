import router from "@adonisjs/core/services/router"
import FilesControllers from "./controllers/index.js";

export const FilesRoutes = () => {
    router.resource('/files', FilesControllers).apiOnly();
}