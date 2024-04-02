import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveryLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEmun = {
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
                Level: severityEmun[log.Level],
                Message: log.Message,
                Origin: log.Origin
            }
        })
        console.log(`Postgres log created: ${ newLog.Id }`);
    }
    async getLogs(severity: LogSeveryLevel): Promise<LogEntity[]>
    {
        const logs = await prisma.logModel.findMany({
            where: {
                Level: severityEmun[severity]
            }
        });

        return logs.map(LogEntity.fromObject);
    }
}