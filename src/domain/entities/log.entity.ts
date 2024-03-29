export enum LogSeveryLevel
{
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export class LogEntity
{
    public Level: LogSeveryLevel;
    public Message: string;
    public CreatedAt: Date;

    constructor(message: string, level: LogSeveryLevel)
    {
        this.Level = level
        this.Message = message
        this.CreatedAt = new Date()
    }

    static fromJson = (jsonData: string): LogEntity =>
    {
        const result = JSON.parse(jsonData) as LogEntity
        return result;
    }
}