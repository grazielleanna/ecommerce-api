import { Exception } from "@adonisjs/core/exceptions";
import { HttpContext } from "@adonisjs/core/http";
import LogMessage from "../utils/logMessage.js";

export default class NotFoundException extends Exception {
    public async handle(error: this, ctx: HttpContext) {
        ctx.response.status(404).send({
            message: error.message,
            code: 'E_NOT_FOUND'
        })
    }

    public report(_: this, ctx: HttpContext) {
        LogMessage.write('warn', ctx.request.method(), ctx.request.url(), 404);
    }
}