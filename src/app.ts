import express, { Application, Response, Request, NextFunction } from "express";
import session, {Store} from "express-session";
import connectRedis, { RedisStore } from "connect-redis";
import Redis from "ioredis";
import { randomBytes } from "crypto";
import { ApiRoute } from './routes/api.route';
import helmet from "helmet";
import statusMonitor from "express-status-monitor";
import status_monitor_conf from "./applications/status-monitor/status-monitor.json";
import rateLimit from "express-rate-limit";
import mongo_connection from "./database/mongo.database";
import { REDIS_OPTIONS, SESSION_OPTIONS } from "./config";
import { prepareDatabase } from "./scripts/migration/schools/main";

class Api {
    public api: Application
    private status_monitor:any

    constructor(){
        this.api = express()
        this.statusMonitorConfig()
        this.securityOptions()
        this.config();
        this.sessionSetup(this.redisSetup());
        this.routeConfig();
        this.mongoSetup();
        console.info(process.env.NODE_ENV);
    }

    private config = () => {
        this.api.use(express.json())
        this.api.use(express.urlencoded({extended: true}))
        this.api.use(rateLimit({
            windowMs: 1 * 60 * 1000,
            max:30
        }))
    }

    private routeConfig = () => {
        this.api.use("/", new ApiRoute().Routes(this.status_monitor.pageRoute))
    }

    private securityOptions = () => {

        this.api.use((req, res, next)=>{
            res.locals.cspNonce = randomBytes(16).toString("hex");
            next();
        })

        this.api.use(helmet({
            contentSecurityPolicy:{
                useDefaults:true,
                directives:{
                    scriptSrc: ["'self'", "*.cloudflare.com", "'unsafe-inline'" ,(req, res) => {
                        // @ts-ignore
                        return `nonce-${res.locals.cspNonce}`
                    }],
                }
            },
            hidePoweredBy:true
        }))
    }

    private statusMonitorConfig = () => {
        this.status_monitor = statusMonitor({...status_monitor_conf})
        this.api.use(this.status_monitor.middleware)
    }

    private mongoSetup = async () => {
        await mongo_connection.connection()
        //await this.migration()
    }

    private redisSetup = () => {
        const RedisStore = connectRedis(session)
        const client = new Redis(REDIS_OPTIONS)
        return new RedisStore({client})
    }

    private sessionSetup = (store:Store) => {
        this.api.use(session({...SESSION_OPTIONS, store}))
    }

    private migration = async () => {
        try {
           const result = await prepareDatabase()
           console.log(result)
        } catch (error) {
            console.info(error)
        }
    }
}

export default new Api().api;