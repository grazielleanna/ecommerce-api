import { HttpContext } from "@adonisjs/core/http";
import { createUserLoginValidator, createUserValidator, updateUserValidator } from "../validators/index.js";
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

    async show({ response, params }: HttpContext) {
        const userId = params.id;
        const user = await this.userService.getUserById(userId)

        return response.ok(user);
    }

    async update({ request, response, params }: HttpContext) {
        const userId = params.id;
        const requestBody = await request.validateUsing(updateUserValidator)

        const user = await this.userService.updateUser(requestBody, userId)

        return response.ok(user);
    }

    async login({ request, response }: HttpContext) {
        const requestBody = await request.validateUsing(createUserLoginValidator);

        const token = await this.userService.loginUser(requestBody);

        return response.ok(token);
    }

    async validate({ auth, response }: HttpContext) {
        const userIsAuthenticated = auth.isAuthenticated;

        if (userIsAuthenticated) {
            return response.ok(userIsAuthenticated);
        }

        return response.unauthorized('Token expired.');
    }

    async getUserByToken({ auth, response }: HttpContext) {
        const user = auth.user;

        if (user) {
            return response.ok(user);
        }

        return response.unauthorized('Unauthorized.');
    }
}