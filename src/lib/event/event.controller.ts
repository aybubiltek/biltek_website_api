import IController from '../../interfaces/IController';
import { EventService } from './event.service';
import { events } from "../../applications/acl.module.conf.json";
import { Response, Router, NextFunction } from 'express';
import { AuthRequest, PublicRequest } from '../../@types';
import { EventDto } from './event.dto';
import { User } from '../user/user.model';
import UserModel from '../user/user.model';
import WorkerModel from '../worker/worker.model';
import CompanyModel from '../company/company.model';
import TagModel from '../tag/tag.model';

export class EventController implements IController{
    private _eventService:EventService

    path = "/" + events
    router = Router()
    
    constructor(){
        this._eventService = new EventService()
    }

    public addEvent =  async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            let eventDto:EventDto = new EventDto()

            eventDto = req.body as EventDto

            const result = await this._eventService.create(eventDto, {})

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


    public getAllEvent = async (req:PublicRequest, res:Response, next:NextFunction) => {
        try {
            const result = await this._eventService.find({}, {createdAt:0, updatedAt:0}, {
                lean:true,
                populate: [
                    {path:"moderator", match: true, model:UserModel},
                    {path:"speakers.speaker", match:true, model: WorkerModel, select:{createdAt:0, updatedAt:0}, populate:[
                        {path: "company", match:true, model:CompanyModel, select:{createdAt:0, updatedAt:0}},
                        {path: "title", match: true, model: TagModel, select:{createdAt:0, updatedAt:0}}
                    ]}
                ]
            })

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

    public getEventById = async (req:PublicRequest, res:Response, next:NextFunction) => {
        try {
            const event = await this._eventService.find({_id: req.params.id as any}, {}, {lean:true})
            
            res.status(200).json({
                status: "success",
                data: event
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }


    public updateEvent = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            let eventDto:EventDto = new EventDto()
            eventDto = req.body as EventDto

            const result = await this._eventService.update({_id:eventDto._id}, {
                name: eventDto.name,
                url: eventDto.url,
                img: eventDto.img,
                isActive: eventDto.isActive,
                moderator: eventDto.moderator,
                startDate: eventDto.startDate,
                finishDate: eventDto.finishDate,
                speakers: eventDto.speakers
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

    public getActiveEvent = async (req:PublicRequest, res:Response, next: NextFunction) => {
        try {
            const result = await this._eventService.find({isActive:true}, {createdAt:0, updatedAt:0}, {lean:true, sort:{name:1}})

            res.status(200).json({
                status: "success",
                data: result
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                msg:error
            })
        }
    }



}