import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveryLevel } from "../../domain/entities/log.entity";

export class MongoDatasource implements LogDatasource
{
    async saveLog(log: LogEntity): Promise<void>
    {
        const newLog = await LogModel.create(log);
        console.log(`Mongo log created: ${ newLog.id }`);
    }

    async getLogs(severity: LogSeveryLevel): Promise<LogEntity[]>
    {
        const logs = await LogModel.find({
            Level: severity
        });

        return logs.map(LogEntity.fromObject);
    }
}