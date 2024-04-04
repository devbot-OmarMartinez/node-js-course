import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

export const primaSeverityEnum = {
    low: SeverityLevel.LOW,
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM
}

export class PostgresDatasource implements LogDatasource
{
    async saveLog(log: LogEntity): Promise<void>
    {
        const newLog = await prisma.logModel.create({
            data: {
                Level: primaSeverityEnum[log.Level],
                Message: log.Message,
                Origin: log.Origin
            }
        })
        console.log('Postgres log created:', newLog.Id);
    }
    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]>
    {
        const logs = await prisma.logModel.findMany({
            where: {
                Level: primaSeverityEnum[severity]
            }
        });

        const result = logs.map(e => ({...e, Level: e.Level.toLowerCase()}))

        return result.map(LogEntity.fromObject);
    }
}