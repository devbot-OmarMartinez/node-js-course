import { LogEntity, LogEntityOptions, LogSeveryLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

export interface CheckServiceMultipleUseCase {
    execute: (url:string) => Promise<boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = (error:string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
        private readonly logRepositories: LogRepository[],
    ) {
    }

    private callLogs(log: LogEntity){
        this.logRepositories.forEach(repo => repo.saveLog(log))
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
                Level: LogSeveryLevel.low
            } as LogEntityOptions
            const log = new LogEntity(logOptions);
            this.callLogs(log);
            return true;
        } catch (error) {
            const errorString = `${error}`;

            const logOptions = {
                Message: errorString,
                Origin: 'check-service.ts',
                Level: LogSeveryLevel.high
            } as LogEntityOptions

            const errorLog = new LogEntity(logOptions);
            this.callLogs(errorLog);

            this.errorCallback(errorString)
            return false;
        }
        return true;
    }
}