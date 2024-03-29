import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveryLevel } from "../../domain/entities/log.entity";
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
        const logs = content
            .split('\n')
            .map(log => LogEntity.fromJson(log));

        return logs;
    }

    async saveLog(newLog: LogEntity): Promise<void>
    {
        const logAsJson = `${ JSON.stringify(newLog) }\n`;
        fs.appendFileSync(this._allLogPath, logAsJson)

        if (newLog.Level === LogSeveryLevel.low)
        {
            return
        }

        if (newLog.Level === LogSeveryLevel.medium)
        {
            fs.appendFileSync(this._mediumLogPath, logAsJson)
        }

        if (newLog.Level === LogSeveryLevel.high)
        {
            fs.appendFileSync(this._highLogPath, logAsJson)
        }
    }

    async getLogs(severity: LogSeveryLevel): Promise<LogEntity[]>
    {
        let result = [] as LogEntity[];
        switch (severity)
        {
            case LogSeveryLevel.low:
                result = this.getLogsFromFile(this._allLogPath);
                break;
            case LogSeveryLevel.medium:
                result = this.getLogsFromFile(this._mediumLogPath);
                break;
            case LogSeveryLevel.high:
                result = this.getLogsFromFile(this._highLogPath);
                break;

            default:
                throw new Error(`${severity} not implemented`)
        }

        return result;
    }

}