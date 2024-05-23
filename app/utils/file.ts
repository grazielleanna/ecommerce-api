import { MultipartFile } from "@adonisjs/core/bodyparser";
import { cuid } from "@adonisjs/core/helpers";

/**
 * @author: Grazielle Conceição
 * @since: 2024-05-23
 * @param file 
 * @returns Promise<{ filePath: string; fileName: string; }>
 */
export async function saveFile(file: MultipartFile) {
    const fileName = file.clientName;

    const { location, newFileName } = fileNameEnconder(fileName);

    await file.move(location, {
        name: newFileName
    });

    const filePath = `${location.replace('public/', '')}/${newFileName}`;

    const fileObject = {
        filePath,
        fileName
    }

    return fileObject;
}

/**
 * @author: Grazielle Conceição
 * @since: 2024-05-23
 * @param fileName 
 * @description encode file name with a cuid
 * @returns Object { newFileName: string; location: string; }
 */
export function fileNameEnconder(fileName: string) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();

    const location = `public/uploads/files/${currentYear}/${currentMonth}/${currentDay}`;

    const randomName = cuid();
    const fileNameSplitted = fileName.split('.');
    const newFileName = `${randomName}.${fileNameSplitted[fileNameSplitted.length - 1]}`;

    return { newFileName, location };
}