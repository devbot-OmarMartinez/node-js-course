import { LogEntity, LogEntityOptions, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

export interface CheckServiceUseCase {
    execute: (url:string) => Promise<boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = (error:string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
        private readonly logRepository: LogRepository,
    ) {
    }

    public async execute (url:string):Promise<boolean> {
        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error('Error un check service ' + url)
            }

            this.successCallback();
            const logOptions = {
                Message: `Service ${url} working`,
                Origin: 'check-service.ts',
                Level: LogSeverityLevel.low
            } as LogEntityOptions
            const log = new LogEntity(logOptions);
            this.logRepository.saveLog(log);
            return true;
        } catch (error) {
            const errorString = `${error}`;

            const logOptions = {
                Message: errorString,
                Origin: 'check-service.ts',
                Level: LogSeverityLevel.high
            } as LogEntityOptions

            const errorLog = new LogEntity(logOptions);
            this.logRepository.saveLog(errorLog);

            this.errorCallback(errorString)
            return false;
        }
        return true;
    }
}