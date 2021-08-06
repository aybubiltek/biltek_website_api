import IRoute from '../../interfaces/IRoute';
import { SchoolController } from './school.controller';
import { checkIsLoggedIn } from '../../middleware/auth.middleware';
import { checkAcl } from '../../middleware/acl.middleware';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { UniversityDto } from './university/university.dto';
import { DepartmentDto } from './department/department.dto';
import { Router } from 'express';

export class SchoolRoute implements IRoute{
    private _schoolController:SchoolController

    moduleName:string

    constructor(){
        this._schoolController = new SchoolController()
        this.moduleName = "school"
    }

    public SchoolRoutes = ():Router => {

        this._schoolController.router.post(
            "/add/university",
            checkIsLoggedIn(),
            checkAcl(),
            validationMiddleware(UniversityDto, {
                validator:{
                    skipMissingProperties:true,
                    stopAtFirstError:false
                }
            }), this._schoolController.addUniversity
        )

        this._schoolController.router.post(
            "/add/department",
            checkIsLoggedIn(),
            checkAcl(),
            this._schoolController.addDepartment
        )

        return this._schoolController.router
    }

    public getPath = ():string => {
        return this._schoolController.path
    }
}