import nodemailer from 'nodemailer';
import { EmailService, SendEmailOptions } from './email.service';

const testEmail = 'fmartinez@devbot.com'

describe('EmailService', () =>
{
    const mockSendMail = jest.fn();

    // Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailSevice = new EmailService();

    test('should send email', async () =>
    {
        const options: SendEmailOptions = {
            to: testEmail,
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        };

        await emailSevice.SendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: undefined,
            html: '<h1>Test</h1>',
            subject: 'Test',
            to: testEmail,
        });
    });

    test('should send email with attachements', async () =>
    {
        const content = "<h1>Greetings!</h1>";
        await emailSevice.SendEmailWithLogs(testEmail, content);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: testEmail,
            subject: "Logs del servidor",
            html: content,
            attachments: [
                { filename: 'logs-low.log', path: './logs/logs-low.log' },
            ]
        });
    });
});