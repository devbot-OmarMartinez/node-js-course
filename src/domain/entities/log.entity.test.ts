import { LogEntity, LogSeverityLevel } from './log.entity';

describe('LogEntity', () =>
{
    const dataObj = {
        Message: 'Hola Mundo',
        Level: LogSeverityLevel.high,
        Origin: 'log.entity.test.ts'
    }

    test('should create a LogEntity instance', () =>
    {

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.Message).toBe(dataObj.Message);
        expect(log.Level).toBe(dataObj.Level);
        expect(log.Origin).toBe(dataObj.Origin);
        expect(log.CreatedAt).toBeInstanceOf(Date);

    });

    test('should create a LogEntity instance from json', () =>
    {
        const json = `{"Message":"Service https://google.com working","Level":"low","CreatedAt":"2023-08-31T16:39:15.618Z","Origin":"check-service.ts"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.Message).toBe("Service https://google.com working");
        expect(log.Level).toBe(LogSeverityLevel.low);
        expect(log.Origin).toBe("check-service.ts");
        expect(log.CreatedAt).toBeInstanceOf(Date);
    });


    test('should create a LogEntity instance from object', () =>
    {
        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.Message).toBe(dataObj.Message);
        expect(log.Level).toBe(dataObj.Level);
        expect(log.Origin).toBe(dataObj.Origin);
        expect(log.CreatedAt).toBeInstanceOf(Date);
    })
})