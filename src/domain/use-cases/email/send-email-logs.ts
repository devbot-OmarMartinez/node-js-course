import { EmailService } from "../../email/email.service";
import { LogEntity, LogSeveryLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface SendLogEmailUseCase
{
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase
{

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) { }

    async execute(to: string | string[]): Promise<boolean> 
    {
        try
        {
            const sent = await this.emailService.SendEmailWithLogs(to);
            if (!sent)
            {
                throw new Error('Email not sent')
            }
            
            this.logRepository.saveLog(new LogEntity({
                Level: LogSeveryLevel.low,
                Message:'Email sent',
                Origin: 'send-email-logs.ts'
            }))

            return true;
        } catch (error)
        {
            this.logRepository.saveLog(new LogEntity({
                Level: LogSeveryLevel.high,
                Message: `${error}`,
                Origin: 'send-email-logs.ts'
            }))

            return false;
        }
    }

}