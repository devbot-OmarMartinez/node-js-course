import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';
import { SendEmailLogs } from './send-email-logs';

describe('SendEmailLogs', () =>
{
    const mockEmailService = {
        SendEmailWithLogs: jest.fn().mockReturnValue(true)
    };

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository,
    );

    beforeEach(() =>
    {
        jest.clearAllMocks();
    })

    test('should call sendEmail and saveLog', async () =>
    {
        const result = await sendEmailLogs.execute('omartineztz@gmail.com');

        expect(result).toBe(true);
        expect(mockEmailService.SendEmailWithLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            CreatedAt: expect.any(Date),
            Level: "low",
            Message: "Email sent",
            Origin: "send-email-logs.ts",
        });
    });

    test('should log in case of error', async () =>
    {
        mockEmailService.SendEmailWithLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('omartineztz@gmail.com');

        expect(result).toBe(false);
        expect(mockEmailService.SendEmailWithLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            CreatedAt: expect.any(Date),
            Level: "high",
            Message: "Error: Email not sent",
            Origin: "send-email-logs.ts",
        });
    });
});