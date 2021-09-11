import IController from '../../interfaces/IController';
import { WorkerService } from './worker.service';
import { workers } from "../../applications/acl.module.conf.json";
import { NextFunction, Router, Response } from 'express';
import { AuthRequest } from '../../@types';
import { WorkerDto } from './worker.dto';

export class WorkerController implements IController {
    private _workerService: WorkerService

    path = "/" + workers
    router = Router()

    constructor(){
        this._workerService = new WorkerService()
    }

    public addWorker = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            let workerDto:WorkerDto = new WorkerDto()
            workerDto = req.body as WorkerDto
            const result = await this._workerService.create(workerDto, {})

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


    public updateWorker = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            let workerDto:WorkerDto = new WorkerDto()
            workerDto = req.body as WorkerDto

            const result = await this._workerService.update({_id: workerDto._id}, {
                name_surname: workerDto.name_surname,
                email: workerDto.email,
                phone_number: workerDto.phone_number,
                company: workerDto.company,
                title: workerDto.title
            }, {})

            res.status(200).json({
                status: "success",
                data: result
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }



    public getWorkersByCompany = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            const result = await this._workerService.find({company: req.params.id as any}, {}, {lean:true})

            res.status(200).json({
                status: "success",
                data: result
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }


    public getAllWorker = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            const workers = await this._workerService.find({}, {}, {lean:true})

            res.status(200).json({
                status: "success",
                data: workers
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }



    public getWorkerById = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            const worker = await this._workerService.find({_id: req.params.id as any}, {}, {lean:true})

            res.status(200).json({
                status: "success",
                data: worker
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }
}