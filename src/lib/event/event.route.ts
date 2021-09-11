import IRoute from '../../interfaces/IRoute';
import { EventController } from './event.controller';
import { events } from "../../applications/acl.module.conf.json";
import { Router } from 'express';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { EventDto } from './event.dto';
import { checkIsLoggedIn } from '../../middleware/auth.middleware';
import { checkAcl } from '../../middleware/acl.middleware';


export class EventRoute implements IRoute {
    private _eventController: EventController

    moduleName:string

    constructor(){
        this.moduleName = events
        this._eventController = new EventController()
    }

    public getRoutes():Router{
        this._eventController.router.post(
            "/", 
            checkIsLoggedIn(),
            checkAcl(),
            validationMiddleware(EventDto,{
                validator:{
                    skipMissingProperties:true,
                    stopAtFirstError: false
                }
            }),
            this._eventController.addEvent
        )


        this._eventController.router.get(
            "/",
            this._eventController.getAllEvent
        )

        this._eventController.router.put(
            "/",
            checkIsLoggedIn(),
            checkAcl(),
            validationMiddleware(EventDto, {validator:{
                skipMissingProperties: true,
                stopAtFirstError: false
            }}),
            this._eventController.updateEvent
        )

        this._eventController.router.get(
            "/:id",
            this._eventController.getEventById
        )

        return this._eventController.router
    }

    
    public getPath = ():string => {
        return this._eventController.path
    }
}