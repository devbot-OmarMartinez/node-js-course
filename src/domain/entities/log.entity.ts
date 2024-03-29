export enum LogSeveryLevel
{
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    Level: LogSeveryLevel;
    Message: string;
    Origin: string;
    CreatedAt?: Date;
}

export class LogEntity
{
    public Level: LogSeveryLevel;
    public Message: string;
    public CreatedAt: Date;
    public Origin: string;

    constructor(options: LogEntityOptions)
    {
        const {Message, Level, Origin, CreatedAt = new Date()} = options
        this.Level = Level
        this.Message = Message
        this.CreatedAt = CreatedAt
        this.Origin = Origin
    }

    static fromJson = (jsonData: string): LogEntity =>
    {
        const result = JSON.parse(jsonData) as LogEntity
        return result;
    }
}