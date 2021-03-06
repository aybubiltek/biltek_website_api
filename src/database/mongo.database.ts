import mongoose, { Connection, ConnectOptions } from "mongoose";
import { MONGODB_URI_DEVEL, MONGODB_URI_PROD } from "../config";
import { IConnection } from './IConnection';

class MongoConnection implements IConnection {
    private uri:string = process.env.NODE_ENV == "production" ? MONGODB_URI_PROD : MONGODB_URI_DEVEL
    disconnection(): void {
        mongoose.connection.close(() => {
            console.info("Mongoose default connection is disconnected");
        })
    }
    public async connection(): Promise<void> {
        mongoose.Promise = global.Promise

        const options: ConnectOptions = {

            noDelay: true,
            autoIndex: false,
            socketTimeoutMS: 45000,
            family: 4,
            keepAlive: true,
            keepAliveInitialDelay: 300000
        }
        mongoose.connect(this.uri, options)

        mongoose.connection.on("error", (err) => {
            console.error("Failed to Connect MongoDb")
        })

        mongoose.connection.on("disconnected", () => {
            console.warn("Mongo db disconnected")
        })

        mongoose.connection.on("connected", () => {
            console.info("mongo db is connected")
        })
    }

}

export default new MongoConnection()