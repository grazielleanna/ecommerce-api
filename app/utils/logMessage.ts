import logger from '@adonisjs/core/services/logger'

export type LogLevelType = 'info' | 'warn' | 'error';

class LogMessage {
    private currentDate = new Date().toLocaleString('pt-BR');

    private statusCodeList: { [x: number]: string } = {
        200: 'Ok',
        201: 'Created',
        204: 'No content',
        400: 'Bad request',
        401: 'Unauthorized',
        404: 'Not found',
        500: 'Internal server error',
    };

    /**
     * Writes response logs and displays on the log file.
     * @param logLevel - Level of the log that will be displayed.
     * @param httpMethod - Request method.
     * @param endpoint - Request endpoint.
     * @param statusCode - Number of status code.
     * @param responseObject - Response info to be inserted on Logger method.
     * @param message - Custom message to be added in the log.
     */

    public write(
        logLevel: LogLevelType,
        httpMethod: string,
        endpoint: string,
        statusCode: number,
        responseObject: any = {},
        message?: string,
    ) {
        const logMessage = `[${this.currentDate}] - ${httpMethod} ${endpoint}: ${this.statusCodeList[statusCode]
            } (${statusCode}) ${message ? '- ' + message : ''}`;

        switch (logLevel) {
            case 'warn':
                logger.warn(responseObject, logMessage);
                break;
            case 'error':
                logger.error(responseObject, logMessage);
                break;
            default:
                logger.info(responseObject, logMessage);
        }
    }
}

export default new LogMessage();