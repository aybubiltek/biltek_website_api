import { Response, Router, NextFunction } from 'express';
import IController from '../../interfaces/IController';
import { UniversityService } from './university/university.service';
import { DepartmentService } from './department/deparment.service';
import { AuthRequest, PublicRequest } from '../../@types';
import { UniversityDto } from './university/university.dto';
import { DepartmentDto } from './department/department.dto';
import { schools } from "../../applications/acl.module.conf.json";
import { Types } from "mongoose";


export class SchoolController implements IController{
    path = "/" + schools
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

    public getUniversities = async (req:PublicRequest, res:Response, next:NextFunction) => {
        try {
            const universities = await this._universityService.find({}, {universityName:1}, {lean:true, sort: {universityName:1}})

            res.status(200).json({
                status: "success",
                data: universities
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }

    public getDepartmentByUniversity = async (req:PublicRequest, res:Response, next:NextFunction) => {
        try {
            /*const universityDto: UniversityDto = new UniversityDto() 
            universityDto._id.set(()=>{req.params.id})  */
            const departments = await this._departmentService.find({university: req.params.id as any}, {departmentName:1}, {lean:true, sort:{departmentName: 1}})

            res.status(200).json({
                status: "success",
                data: departments
            })

        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }
}