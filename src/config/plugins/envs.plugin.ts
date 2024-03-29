import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
    MAILER_SECTRET_KEY: env.get("MAILER_SECTRET_KEY").required().asString(),
    MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
    PROD: env.get("PROD").required().asBool(),
}