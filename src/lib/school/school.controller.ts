import { Response, Router, NextFunction } from 'express';
import IController from '../../interfaces/IController';
import { UniversityService } from './university/university.service';
import { DepartmentService } from './department/deparment.service';
import { AuthRequest } from '../../@types';
import { UniversityDto } from './university/university.dto';
import { DepartmentDto } from './department/department.dto';

export class SchoolController implements IController{
    path = "/school"
    router = Router()

    private _universityService: UniversityService
    private _departmentService: DepartmentService

    constructor(){
        this._universityService = new UniversityService()
        this._departmentService = new DepartmentService()
    }

    public addUniversity = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            let universityDto:UniversityDto = new UniversityDto()
            universityDto = req.body as UniversityDto

            const result = await this._universityService.create(universityDto, {})
            res.json({
                status: "success",
                data: result
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }

    public addDepartment = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            let department:DepartmentDto = new DepartmentDto()

            department = req.body as DepartmentDto

            const result = await this._departmentService.create(department, {})
            
            res.status(201).json({
                status: "success",
                data: result
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }
}