import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

export class Server {
    static start(){
        console.log("Server started...");

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const date = new Date();
                const checkService = new CheckService(
                    () => {console.log('success')},
                    (error:string) => {console.log(`error: ${error}`)},
                    fileSystemLogRepository
                );
                checkService.execute('https://google.com');
            }
        );

        
    }
}