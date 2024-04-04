import mongoose from "mongoose"
import { envs } from "../../config/plugins/envs.plugin"
import { LogModel, MongoDatabase } from "../../data/mongo"
import { MongoDatasource } from "./mongo.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"

describe('first', () =>
{
    const logDataSource = new MongoDatasource();
    const log = new LogEntity({
        Level: LogSeverityLevel.medium,
        Message: 'test message',
        Origin: 'mongo-log.datasource.test.ts'
    })

    beforeAll(async () =>
    {
        await MongoDatabase.Connect({
            mongoURL: envs.MONGO_URL,
            dbName: envs.MONGO_DB
        })
    })

    afterAll(() =>
    {
        mongoose.connection.close();
    })

    afterEach(async () =>
    {
        await LogModel.deleteMany();
    })

    test('should create a log', async () =>
    {
        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo log created:", expect.any(String));
    })

    test('should get logs', async () =>
    {
        logDataSource.saveLog(log);
        logDataSource.saveLog(log);

        const logs = await logDataSource.getLogs(LogSeverityLevel.medium);
        expect(logs.length).toBe(2);
        expect(logs.every(lo => lo.Level === LogSeverityLevel.medium)).toBe(true);
    })
})