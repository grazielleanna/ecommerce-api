import { HttpContext } from "@adonisjs/core/http";
import { createUserLoginValidator, createUserValidator } from "../validators/index.js";
import { inject } from "@adonisjs/core";
import UserService from "../services/index.js";

@inject()
export default class UserController {
    constructor(protected userService: UserService) { }

    async store({ request, response }: HttpContext) {
        const requestBody = await request.validateUsing(createUserValidator);

        const user = await this.userService.createUser(requestBody);

        return response.ok(user);
    }

    async login({ request, response }: HttpContext) {
        const requestBody = await request.validateUsing(createUserLoginValidator);

        const token = await this.userService.loginUser(requestBody);

        return response.ok(token);
    }
}