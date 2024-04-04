import { envs } from "./envs.plugin"

describe('envs.plugin.ts', () =>
{
    test('should return env options', () =>
    {
        // console.log(envs);
        expect(envs).toEqual({
            PORT: 3001,
            MAILER_EMAIL: 'omartineztz@gmail.com',
            MAILER_SECTRET_KEY: 'gnkihcmwulzfqijm',
            MAILER_SERVICE: 'gmail',
            PROD: false,
            MONGO_URL: 'mongodb://omardevbot:123345678@localhost:27017/',
            MONGO_DB: 'NOC-Test',
            MONGO_USER: 'omardevbot',
            MONGO_PASS: '123345678',
            POSTGRES_USER: 'postgres',
            POSTGRES_DB: 'NOC-Test',
            POSTGRES_PASSWORD: '123345678',
            POSTGRES_URL: 'postgresql://postgres:123345678@localhost:5432/NOC-Test'
        })
    })

    test('should return error if not found env', async () =>
    {
        jest.resetModules();
        process.env.PORT = 'ABC';

        try
        {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error)
        {
            expect(`${ error }`).toContain('"PORT" should be a valid integer');
        }
    })
})