import IRoute from '../../interfaces/IRoute';
import { WorkerController } from './worker.controller';
import { workers } from "../../applications/acl.module.conf.json";
import { Router } from 'express';
import { checkIsLoggedIn } from '../../middleware/auth.middleware';
import { checkAcl } from '../../middleware/acl.middleware';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { WorkerDto } from './worker.dto';

export class WorkerRoute implements IRoute {
    private _workerController:WorkerController

    moduleName:string

    constructor(){
        this.moduleName = workers
        this._workerController = new WorkerController()
    }


    public getRoutes(): Router {
        this._workerController.router.post(
            "/",
            checkIsLoggedIn(),
            checkAcl(),
            validationMiddleware(WorkerDto, {validator:{
                skipMissingProperties: true,
                stopAtFirstError: false
            }}),
            this._workerController.addWorker
        )
 
        this._workerController.router.put(
            "/",
            checkIsLoggedIn(),
            checkAcl(),
            validationMiddleware(WorkerDto, {validator: {
                skipMissingProperties: true,
                stopAtFirstError: false
            }}),
            this._workerController.updateWorker
        )

        this._workerController.router.get(
            "/",
            checkIsLoggedIn(),
            checkAcl(),
            this._workerController.getAllWorker
        )
 
        this._workerController.router.get(
            "/company/:id",
            checkIsLoggedIn(),
            checkAcl(),
            this._workerController.getWorkersByCompany
        )

        this._workerController.router.get(
            "/:id",
            checkIsLoggedIn(),
            checkAcl(),
            this._workerController.getWorkerById
        )


        return this._workerController.router
    }

    public getPath(): string {
        return this._workerController.path
    }
}