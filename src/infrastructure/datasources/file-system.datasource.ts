import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'

export class FileSystemDatasource implements LogDatasource
{
    private readonly _logPath = 'logs/';
    private readonly _allLogPath = 'logs/logs-low.log';
    private readonly _mediumLogPath = 'logs/logs-medium.log';
    private readonly _highLogPath = 'logs/logs-high.log';

    constructor()
    {
        this.createLogsFiles();
    }

    private createLogsFiles()
    {
        if (!fs.existsSync(this._logPath))
        {
            fs.mkdirSync(this._logPath)
        }

        [
            this._allLogPath,
            this._mediumLogPath,
            this._highLogPath
        ].forEach(path =>
        {
            if (!fs.existsSync(path))
            {
                fs.writeFileSync(path, '')
            }
        })
    }

    private getLogsFromFile = (path: string): LogEntity[] =>
    {
        const content = fs.readFileSync(path, 'utf-8')
        const allLogs = content.split('\n').filter(e => e !== undefined && e !== '')
        const logs = allLogs.map(log => LogEntity.fromJson(log));

        return logs;
    }

    async saveLog(newLog: LogEntity): Promise<void>
    {
        const logAsJson = `${ JSON.stringify(newLog) }\n`;
        fs.appendFileSync(this._allLogPath, logAsJson)

        if (newLog.Level === LogSeverityLevel.low)
        {
            return
        }

        if (newLog.Level === LogSeverityLevel.medium)
        {
            fs.appendFileSync(this._mediumLogPath, logAsJson)
        }

        if (newLog.Level === LogSeverityLevel.high)
        {
            fs.appendFileSync(this._highLogPath, logAsJson)
        }

        console.log('File system log created');
    }

    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]>
    {
        let result = [] as LogEntity[];
        switch (severity)
        {
            case LogSeverityLevel.low:
                result = this.getLogsFromFile(this._allLogPath);
                break;
            case LogSeverityLevel.medium:
                result = this.getLogsFromFile(this._mediumLogPath);
                break;
            case LogSeverityLevel.high:
                result = this.getLogsFromFile(this._highLogPath);
                break;

            default:
                throw new Error(`${severity} not implemented`)
        }

        return result;
    }

}