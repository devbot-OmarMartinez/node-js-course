import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('FileSystemDatasource', () =>
{
    const logPath = path.join(__dirname, '../../../logs')

    beforeEach(() =>
    {
        fs.rmSync(logPath, { recursive: true, force: true });
    })

    test('should create log files if they do not exists', () =>
    {
        new FileSystemDatasource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual(['logs-high.log', 'logs-low.log', 'logs-medium.log'])
    })

    test('should save a log in logs-low.log', () =>
    {
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            Message: 'test',
            Level: LogSeverityLevel.low,
            Origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${ logPath }/logs-low.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in logs-low.log and logs-medium.log', () =>
    {
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            Message: 'test',
            Level: LogSeverityLevel.medium,
            Origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${ logPath }/logs-low.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${ logPath }/logs-medium.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in logs-low.log and logs-high.log', () =>
    {
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            Message: 'test',
            Level: LogSeverityLevel.high,
            Origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${ logPath }/logs-low.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${ logPath }/logs-high.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    });

    test('should return all logs', async () =>
    {
        const logDatasource = new FileSystemDatasource();
        const logLow = new LogEntity({
            Message: 'log-low',
            Level: LogSeverityLevel.low,
            Origin: 'low'
        });
        const logMedium = new LogEntity({
            Message: 'log-medium',
            Level: LogSeverityLevel.medium,
            Origin: 'medium'
        });

        const logHigh = new LogEntity({
            Message: 'log-high',
            Level: LogSeverityLevel.high,
            Origin: 'high'
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);

        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]))
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]))
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]))
    });

    test('should not throw an error if path exists', () =>
    {
        new FileSystemDatasource();
        new FileSystemDatasource();

        expect(true).toBeTruthy();
    })

    test('should throw an error if severity level is not defined', async () =>
    {
        const logDatasource = new FileSystemDatasource();
        const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;

        try
        {
            await logDatasource.getLogs(customSeverityLevel);
            expect(true).toBeFalsy();
        } catch (error)
        {
            const errorString = `${ error }`;

            expect(errorString).toContain(`${ customSeverityLevel } not implemented`);
        }
    })
})