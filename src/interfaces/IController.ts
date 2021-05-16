import { Router } from "express";

export default interface IController{
    path:String;
    router:Router;
}