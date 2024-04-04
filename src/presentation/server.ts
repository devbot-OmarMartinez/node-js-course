import { PrismaClient } from "@prisma/client";
import { envs } from "../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../data/mongo";
import { EmailService } from "./email/email.service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDatasource } from "../infrastructure/datasources/mongo.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { PostgresDatasource } from "../infrastructure/datasources/postgres.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoDatasource()
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresDatasource()
);
const emailService = new EmailService();

export class Server {
    static async start(){
        console.log("Server started...");

        // new SendEmailLogs(emailService, fileSystemLogRepository).execute('fmartinez@devbot.com')

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const date = new Date();
                const checkService = new CheckServiceMultiple(
                    () => {console.log('success')},
                    (error:string) => {console.log(`error: ${error}`)},
                    [fsLogRepository, mongoLogRepository, postgresLogRepository]
                );
                checkService.execute('https://google.com');
            }
        );

        // const newLog = await LogModel.create({
        //     Message: 'Test message desde Mongo',
        //     Origin: 'App.ts',
        //     Level: 'medium'
        // });

        // await newLog.save();

        // const logs = await LogModel.find();
        // console.log(logs);

        // const prisma = new PrismaClient();
        // const newLog = await prisma.logModel.create({
        //     data: {
        //         Level: "LOW",
        //         Message: "Test message 7",
        //         Origin: "server.ts"
        //     }
        // })
        // console.log(newLog);
        // const logs = await logRepository.getLogs(LogSeveryLevel.low)
        // console.log(logs);

    }
}