import express from 'express';
import path from 'path';

interface Options {
    port: number,
    public_path: string
}

export class Server
{
    private app = express();
    private readonly port: number;
    private readonly public_path: string;

    constructor(options: Options) {
        this.port = options.port,
        this.public_path = options.public_path
    }

    async start()
    {


        this.app.use(express.static(this.public_path));

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`)
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}