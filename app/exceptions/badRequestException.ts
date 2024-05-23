import { Exception } from "@adonisjs/core/exceptions";
import { HttpContext } from "@adonisjs/core/http";
import LogMessage from "../utils/logMessage.js";

export default class BadRequestException extends Exception {
    public async handle(error: this, ctx: HttpContext) {
        console.log('error', error)
        ctx.response.status(400).send({
            message: error.message,
            code: 'E_BAD_REQUEST'
        })
    }

    public report(_: this, ctx: HttpContext) {
        LogMessage.write('warn', ctx.request.method(), ctx.request.url(), 400);
    }
}