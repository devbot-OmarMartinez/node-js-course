import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveryLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogRepositoryImpl implements LogRepository
{
    constructor(
        private readonly logDatasource: LogDatasource
    ) { }

    async saveLog(log: LogEntity): Promise<void>
    {
        this.logDatasource.saveLog(log)
    }

    async getLogs(severity: LogSeveryLevel): Promise<LogEntity[]>
    {
        return this.logDatasource.getLogs(severity);
    }

}