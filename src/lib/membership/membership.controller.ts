import IController from '../../interfaces/IController';
import { memberships } from "../../applications/acl.module.conf.json";
import { NextFunction, Response, Router } from 'express';
import { MemberShipService } from './membership.service';
import { AuthRequest, PublicRequest } from '../../@types';
import { MemberShipDto } from './membership.dto';
import { Schema } from 'mongoose';
export class MemberShipController implements IController {
    private __memberShipService:MemberShipService

    path = "/" + memberships
    router = Router()

    constructor(){
        this.__memberShipService = new MemberShipService()
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

            const result = await  this.__memberShipService.update({$and:[{email: memberShipDto.email}, {_id: memberShipDto._id}]}, {
                email: memberShipDto.email, 
                name_surname: memberShipDto.name_surname,
                university: memberShipDto.university,
                department: memberShipDto.department,
                phone_number: memberShipDto.phone_number
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
            const result = await this.__memberShipService.find({}, {}, {lean:true})

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
            let id = req.params.id as unknown as Schema.Types.ObjectId
            const result = await this.__memberShipService.find({_id: id}, {}, {lean:true})

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


}