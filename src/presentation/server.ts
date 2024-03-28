import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {
    static start(){
        console.log("Server started...");

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const date = new Date();
                const checkService = new CheckService(
                    () => {console.log('success')},
                    (error:string) => {console.log(`error: ${error}`)}
                );
                checkService.execute('https://google.com');
            }
        );

        
    }
}