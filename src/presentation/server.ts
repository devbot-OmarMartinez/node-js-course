import express, { Router } from 'express';
import path from 'path';
import { TodosController } from './todos/controller';

interface Options
{
    port: number,
    routes: Router,
    public_path: string
}

export class Server
{
    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: Options)
    {
        this.port = options.port;
        this.public_path = options.public_path;
        this.routes = options.routes;
    }

    async start()
    {
        //* Middlewares
        this.app.use(express.json()); // raw
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

        //* Public Folder
        this.app.use(express.static(this.public_path));

        //* Routes
        this.app.use(this.routes);

        this.app.get('*', (req, res) =>
        {
            const indexPath = path.join(__dirname + `../../../${ this.public_path }/index.html`)
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () =>
        {
            console.log(`Server running on port ${ this.port }`);
        })
    }
}