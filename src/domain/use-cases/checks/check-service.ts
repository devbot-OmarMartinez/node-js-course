import { LogEntity, LogSeveryLevel } from "../../entities/log.entity";
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
            const log = new LogEntity(`Service ${url} working`, LogSeveryLevel.low);
            this.logRepository.saveLog(log);
            return true;
        } catch (error) {
            const errorString = `${error}`;

            const errorLog = new LogEntity(errorString, LogSeveryLevel.high);
            this.logRepository.saveLog(errorLog);

            this.errorCallback(errorString)
            return false;
        }
        return true;
    }
}