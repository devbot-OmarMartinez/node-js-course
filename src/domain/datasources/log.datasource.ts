import { LogEntity, LogSeveryLevel } from "../entities/log.entity";

export abstract class LogDatasource
{
    abstract saveLog(log: LogEntity): Promise<void>;    
    abstract getLogs(severity: LogSeveryLevel): Promise<LogEntity[]>;
}