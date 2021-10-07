import { Router } from "express";

export default interface IRoute{
    moduleName:string
    getRoutes():Router
    getPath():string
}