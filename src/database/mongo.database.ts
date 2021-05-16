import mongoose, { Connection, ConnectionOptions } from "mongoose";
import { MONGODB_URI } from "../config";
import { IConnection } from './IConnection';
import mongo from 'mongoose';

class MongoConnection implements IConnection {
    disconnection(): void {
        mongoose.connection.close(() => {
            console.log("Mongoose default connection is disconnected");
        })
    }
    public connection(): void {
        mongoose.Promise = global.Promise

        const options: ConnectionOptions = {
            compression: {
                compressors: ["snappy","zlib"]
            },
            noDelay: true,
            ha:true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            autoIndex: false,
            poolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
            keepAlive: true,
            keepAliveInitialDelay: 300000
        }
        mongoose.connect(MONGODB_URI, options)

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