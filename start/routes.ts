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
router.group(() => {
  CategoryRoutes()
})