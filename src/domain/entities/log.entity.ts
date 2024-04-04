export enum LogSeverityLevel
{
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions
{
    Level: LogSeverityLevel;
    Message: string;
    Origin: string;
    CreatedAt?: Date;
}

export class LogEntity
{
    public Level: LogSeverityLevel;
    public Message: string;
    public CreatedAt: Date;
    public Origin: string;

    constructor(options: LogEntityOptions)
    {
        const { Message, Level, Origin, CreatedAt = new Date() } = options
        this.Level = Level
        this.Message = Message
        this.CreatedAt = CreatedAt
        this.Origin = Origin
    }

    static fromJson = (jsonData: string): LogEntity =>
    {
        const {Message, Origin, Level, CreatedAt} = JSON.parse(jsonData)
        return new LogEntity({
            Message,
            Origin,
            Level,
            CreatedAt: new Date(CreatedAt)
        });
    }

    static fromObject = (object: { [key: string]: any }): LogEntity =>
    {
        const { Message, Level, CreatedAt, Origin } = object;
        const log = new LogEntity({
            Message: Message, 
            Level: Level, 
            CreatedAt: CreatedAt, 
            Origin: Origin
        })
        return log;
    }
}