import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server"

const main = () =>{
    MongoDatabase.Connect({
        mongoURL: envs.MONGO_URL, 
        dbName: envs.MONGO_DB
    });
    Server.start()
}

(() => {
    main()
})()
