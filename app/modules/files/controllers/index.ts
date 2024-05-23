import { inject } from "@adonisjs/core";
import FilesService from "../services/index.js";
import { HttpContext } from "@adonisjs/core/http";

@inject()
export default class FilesControllers {
    constructor(protected fileService: FilesService) { }

    async destroy({ params, response }: HttpContext) {
        const fileId = params.id;

        await this.fileService.deleteFile(fileId);

        return response.noContent();
    }
}