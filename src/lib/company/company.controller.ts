import IController from '../../interfaces/IController';
import { CompanyService } from './company.service';
import { WorkerService } from '../worker/worker.service';
import { companies } from "../../applications/acl.module.conf.json";
import { AuthRequest, PublicRequest } from '../../@types';
import { NextFunction, Response, Router } from 'express';
import { CompanyDto } from './company.dto';


export class CompanyController implements IController{
    private _companyService:CompanyService

    path = "/" + companies
    router = Router()

    constructor(){
        this._companyService = new CompanyService()
    }


    public addCompany = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            let companyDto:CompanyDto = new CompanyDto()
            companyDto = req.body as CompanyDto

            const result = await this._companyService.create(companyDto, {})

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

    
    public updateCompany = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            let companyDto:CompanyDto = new CompanyDto()
            companyDto = req.body as CompanyDto

            const result = await this._companyService.update({_id: companyDto._id}, {
                name: companyDto.name,
                category: companyDto.category,
                email: companyDto.email,
                logo: companyDto.logo,
                website: companyDto.website,
                phone_number: companyDto.phone_number
            }, {})

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


    public getAllCompany = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            const companies = await this._companyService.find({}, {}, {lean:true})

            res.status(200).json({
                status: "success",
                data: companies
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }


    public getCompanyById = async (req:PublicRequest, res:Response, next:NextFunction) => {
        try {
            const company = await this._companyService.find({_id: req.params.id  as any}, {}, {lean:true})

            res.status(200).json({
                status: "success",
                data: company
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }  
}