import express, { Application } from "express";
import session, {Store} from "express-session";
import connectRedis, { RedisStore } from "connect-redis";
import Redis from "ioredis";
import { ApiRoute } from './routes/api.route';
import helmet from "helmet";
import mongo_connection from "./database/mongo.database";
import { REDIS_OPTIONS, SESSION_OPTIONS } from "./config";

class Api {
    public api: Application

    constructor(){
        this.api = express()
        this.securityOptions()
        this.config();
        this.sessionSetup(this.redisSetup());
        this.routeConfig();
        this.mongoSetup();
       
    }

    private config = () => {
        this.api.use(express.json())
        this.api.use(express.urlencoded({extended: true}))
    }

    private routeConfig = () => {
        this.api.use("/", new ApiRoute().Routes())
    }

    private securityOptions = () => {
        this.api.use(helmet())
    }

    private mongoSetup = () => {
        mongo_connection.connection()
    }

    private redisSetup = () => {
        const RedisStore = connectRedis(session)
        const client = new Redis(REDIS_OPTIONS)
        return new RedisStore({client})
    }

    private sessionSetup = (store:Store) => {
        this.api.use(session({...SESSION_OPTIONS, store}))
    }
}

export default new Api().api;