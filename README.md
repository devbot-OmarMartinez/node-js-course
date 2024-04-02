# NOC Project
The goal is to create a series of tasks using Clean Architecture with TypeScript

## dev
1. Clone .env.template file to .env
2. Configure environment variables
```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false

MONGO_URL=
MONGO_DB=NOC
MONGO_USER=
MONGO_PASS=

POSTGRES_URL=
POSTGRES_DB=NOC
POSTGRES_USER=
POSTGRES_PASSWORD=
```
3. Run
```
npm install
```
4. Run docker
```
docker-compose up
```
5. Run app
```
npm run dev
```
