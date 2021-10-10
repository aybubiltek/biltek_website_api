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
import {mailgun} from "../../helpers/index";
export class MemberShipController implements IController {
    private _memberShipService:MemberShipService
    private _participantService:ParticipantService

    path = "/" + memberships
    router = Router()

    constructor(){
        this._memberShipService = new MemberShipService()
        this._participantService = new ParticipantService()
    }


    public addMemberShip = async (req:PublicRequest, res:Response, next:NextFunction) => {
        try {
            let memberShipDto:MemberShipDto = new MemberShipDto()
            memberShipDto = req.body as MemberShipDto
            
            const check_member = await this._memberShipService.findOne({email: memberShipDto.email}, {}, {lean:true})
            if (check_member === null) {
                const result = await this._memberShipService.create(memberShipDto, {})

                if (result !== null) {
                    await mailgun.createList("deneme", "")
                    const resp2 = await mailgun.addMember("deneme", memberShipDto.name_surname, memberShipDto.email)
    
                    if (resp2) {
                        const inline_path = ["welcome.image.png", "aybulogo.png"]
                        const resp3 = await mailgun.sendMessageWithHtml("info@aybubiltek.com", "Bilim ve Teknoloji Kulübü", memberShipDto.email, "Welcome", "welcome.template.handlebars", {
                            name:memberShipDto.name_surname
                        },inline_path)
                    }
                }
    
                res.status(201).json({
                    status: "success",
                    //data: result
                    message:"Kaydınız başarılı bir şekilde gerçekleşti. Aramıza hoşgeldiniz :)"
                })
            } else {
                res.status(400).json({
                    status: "success",
                    message: "Mail adresiniz sistemimizde kayıtlıdır"
                })
            }
            

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

            const result = await  this._memberShipService.update({$and:[{email: memberShipDto.email}, {_id: memberShipDto._id as any}]}, {$set:{
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
            const result = await this._memberShipService.find({}, {createdAt:0, updatedAt:0}, {
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
            const result = await this._memberShipService.find({_id: req.params.id as any}, {createdAt:0, updatedAt:0}, {
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
            (await mongoose_session).startTransaction();
            const {email, eventId} = req.body
            if (email === undefined && eventId === undefined){
                (await mongoose_session).endSession();

                res.status(420).json({
                    status: "validation error",
                    msg: ""
                })
            }

            const checkMember = await this._memberShipService.findOne({email: email}, {createdAt:0, updatedAt:0}, {lean:true, session: await mongoose_session});

            let participantDto:ParticipantDto = new ParticipantDto();

            if (checkMember){
                
                participantDto.membership = checkMember;
                participantDto.event = eventId;

                const result = await this._participantService.findOne({$and:[{membership: checkMember}, {event: eventId}]}, {}, {lean:true, session:await mongoose_session})

                if (result !== null) {
                    await (await mongoose_session).abortTransaction()
                    await (await mongoose_session).endSession()
                    res.status(200).json({
                        status: "success",
                        message: "You are already registered"
                    })
                } else {
                    await this._participantService.create(participantDto, {session:await mongoose_session});

                    await (await mongoose_session).commitTransaction();
                    (await mongoose_session).endSession();
                    res.status(201).json({
                        status: "success"
                    })
                }


            } else {
                let memberDto:MemberShipDto = new MemberShipDto()
                memberDto = req.body as MemberShipDto
                const result = await this._memberShipService.create(memberDto, {session:await mongoose_session});

                participantDto.membership = result
                participantDto.event = eventId

                const res2 = await this._participantService.create(participantDto, {session:await mongoose_session})

                await (await mongoose_session).commitTransaction();
                (await mongoose_session).endSession();
                res.status(201).json({
                    status: "success"
                })

            }

     
        } catch (error) {
            (await mongoose_session).abortTransaction();
            (await mongoose_session).endSession();
            res.status(400).json({
                status: "error"
            })
        }
    }


}