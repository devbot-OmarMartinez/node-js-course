import { PrismaClient } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresDatasource } from "./postgres.datasource";

describe('Postgres datasource', () =>
{
    const prisma = new PrismaClient();

    beforeAll(async () =>
    {
        await prisma.logModel.deleteMany();
    })

    afterAll(() =>
    {
        prisma.$disconnect();
    })

    afterEach(async () =>
    {
        await prisma.logModel.deleteMany();
    })

    beforeEach(() =>
    {

        jest.clearAllMocks();
    })

    const postgresDatasource = new PostgresDatasource();
    const log = new LogEntity({
        Level: LogSeverityLevel.medium,
        Message: 'test message',
        Origin: 'postgres.datasource.test.ts'
    })

    test('should save log', async () =>
    {
        const logSpy = jest.spyOn(console, 'log');

        await postgresDatasource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Postgres log created:", expect.any(Number));
    });

    test('should get logs', async () =>
    {
        await postgresDatasource.saveLog(log);
        await postgresDatasource.saveLog(log);

        const logs = await postgresDatasource.getLogs(LogSeverityLevel.medium);
        console.log(logs);
        expect(logs.length).toBe(2);
        expect(logs.every(lo => lo.Level === LogSeverityLevel.medium)).toBe(true);
    })
})