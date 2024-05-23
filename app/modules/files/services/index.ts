import NotFoundException from "#exceptions/notFoundException";
import EcommerceFile from "../models/index.js";

export default class FilesService {
    public async deleteFile(fileId: number) {
        const file = await EcommerceFile.findBy('id', fileId);

        if (!file) {
            throw new NotFoundException(`File with id ${fileId} not found.`);
        }

        return file.delete();
    }
}