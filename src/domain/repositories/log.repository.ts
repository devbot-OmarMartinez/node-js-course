import { LogEntity, LogSeveryLevel } from "../entities/log.entity";

export abstract class LogRepository
{
    abstract saveLog(log: LogEntity): Promise<void>;    
    abstract getLogs(severity: LogSeveryLevel): Promise<LogEntity[]>;
}