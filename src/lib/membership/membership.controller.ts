import IController from '../../interfaces/IController';
import { memberships } from "../../applications/acl.module.conf.json";
import { NextFunction, Response, Router } from 'express';
import { MemberShipService } from './membership.service';
import { AuthRequest, PublicRequest } from '../../@types';
import { MemberShipDto } from './membership.dto';
import { Schema } from 'mongoose';
import UniversityModel from '../school/university/university.model';
import DepartmentModel from '../school/department/deparment.model';
import { ParticipantService } from './participant/participant.service';
import mongoose from 'mongoose';
import { ParticipantDto } from './participant/participant.dto';
export class MemberShipController implements IController {
    private __memberShipService:MemberShipService
    private _participantService:ParticipantService

    path = "/" + memberships
    router = Router()

    constructor(){
        this.__memberShipService = new MemberShipService()
        this._participantService = new ParticipantService()
    }


    public addMemberShip = async (req:PublicRequest, res:Response, next:NextFunction) => {
        try {
            let memberShipDto:MemberShipDto = new MemberShipDto()
            memberShipDto = req.body as MemberShipDto

            const result = await this.__memberShipService.create(memberShipDto, {})

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

    public updateMemberShip = async (req:PublicRequest, res:Response, next:NextFunction) => {
        try {
            let memberShipDto:MemberShipDto = new MemberShipDto()
            memberShipDto = req.body as MemberShipDto

            const result = await  this.__memberShipService.update({$and:[{email: memberShipDto.email}, {_id: memberShipDto._id as any}]}, {$set:{
                email: memberShipDto.email,
                name_surname: memberShipDto.name_surname,
                university: memberShipDto.university._id as any,
                department: memberShipDto.department._id as any,
                phone_number: memberShipDto.phone_number
            }}, {})

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

    public deleteMemberShip = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            res.status(200).json({
                status: "success"
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }

    public listAllMemberShip = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            const result = await this.__memberShipService.find({}, {createdAt:0, updatedAt:0}, {
                lean:true, 
                populate: [
                    {path:"university", match:true, model:UniversityModel, select:{universityName:1}},
                    {path:"department", match:true, model:DepartmentModel, select:{departmentName:1}}
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


    public getMemberById = async (req:PublicRequest, res:Response, next:NextFunction) => {
        try {
            const result = await this.__memberShipService.find({_id: req.params.id as any}, {createdAt:0, updatedAt:0}, {
                lean:true,
                populate: [
                    {path:"university", match:true, model:UniversityModel, select:{universityName:1}},
                    {path:"department", match:true, model:DepartmentModel, select:{departmentName:1}}
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


    public participateEvent = async (req:PublicRequest, res:Response, next:NextFunction) => {
        const mongoose_session = mongoose.startSession();
        try {
            const {email, eventId} = req.body
            if (email === undefined && eventId === undefined){
                (await mongoose_session).endSession();

                res.status(420).json({
                    status: "validation error",
                    msg: ""
                })
            }

            const checkMember = await this.__memberShipService.findOne({email: email}, {createdAt:0, updatedAt:0}, {lean:true, session: await mongoose_session});

            let participantDto:ParticipantDto = new ParticipantDto();

            if (checkMember){
                
                participantDto.membership = checkMember;
                participantDto.event = eventId;

                const result = this._participantService.create(participantDto, {session:await mongoose_session});

            } else {
                let memberDto:MemberShipDto = new MemberShipDto()
                memberDto = req.body as MemberShipDto
                const result = await this.__memberShipService.create(memberDto, {session:await mongoose_session});

                participantDto.membership = result
                participantDto.event = eventId

                const res2 = await this._participantService.create(participantDto, {session:await mongoose_session})

            }

            await (await mongoose_session).commitTransaction();
            (await mongoose_session).endSession();
            res.status(201).json({
                status: "success"
            })
        } catch (error) {
            (await mongoose_session).abortTransaction();
            (await mongoose_session).endSession();
            res.status(400).json({
                status: "error"
            })
        }
    }


}