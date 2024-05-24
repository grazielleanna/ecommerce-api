/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { CategoryRoutes } from '../app/modules/category/routes.js'
import { ProductRoutes } from '../app/modules/product/routes.js'
import { FilesRoutes } from '../app/modules/files/routes.js'
import { UserRoutes } from '../app/modules/user/routes.js'

router.group(() => {
  CategoryRoutes(),
  ProductRoutes(),
  FilesRoutes(),
  UserRoutes()
})