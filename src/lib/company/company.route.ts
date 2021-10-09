import IRoute from '../../interfaces/IRoute';
import { CompanyController } from './company.controller';
import { companies } from "../../applications/acl.module.conf.json";
import { Router } from 'express';
import { checkIsLoggedIn } from '../../middleware/auth.middleware';
import { checkAcl } from '../../middleware/acl.middleware';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { CompanyDto } from './company.dto';
import { WorkerDto } from '../worker/worker.dto';

export class CompanyRoute implements IRoute{
    private _companyController:CompanyController

    moduleName:string

    constructor(){
        this.moduleName = companies
        this._companyController = new CompanyController()
    }

    public getRoutes(): Router {
       this._companyController.router.post(
           "/",
           checkIsLoggedIn(),
           checkAcl(),
           validationMiddleware(CompanyDto, {validator: {
               skipMissingProperties: true,
               stopAtFirstError: false
           }}),
           this._companyController.addCompany
       )

       this._companyController.router.put(
           "/",
           checkIsLoggedIn(),
           checkAcl(),
           validationMiddleware(CompanyDto, {validator: {
               skipMissingProperties: true,
               stopAtFirstError: false
           }}),
           this._companyController.updateCompany
       )

       this._companyController.router.get(
           "/",
           checkIsLoggedIn(),
           checkAcl(),
           this._companyController.getAllCompany
       )

       this._companyController.router.get(
           "/:id",
           checkIsLoggedIn(),
           checkAcl(),
           this._companyController.getCompanyById
       )


        return this._companyController.router
    }

    public getPath(): string {
        return this._companyController.path    
    }


    
}