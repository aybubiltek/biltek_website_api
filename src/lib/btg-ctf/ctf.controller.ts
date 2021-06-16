import { NextFunction, Response, Router } from "express";
import { PublicRequest } from "../../@types";
import IController from "../../interfaces/IController";
import { CtfMemberService } from "./member/ctf.member.service";
import { CtfTeamService } from "./team/ctf.team.service";
import mongoose from 'mongoose';
import { CtfTeamDto } from "./team/ctf.team.dto";
import { CtfMemberDto } from './member/ctf.member.dto';

export class CtfController implements IController{
    private _memberService:CtfMemberService
    private _teamService:CtfTeamService

    path = "/ctf"
    router = Router()

    constructor(){
        this._memberService = new CtfMemberService()
        this._teamService = new CtfTeamService()
    }

    public createTeam = async (req:PublicRequest, res:Response, next:NextFunction) => {
        /**
         * ! Request schema
         * {
                "team": {
                    "team_name": "deneme2"
                },
                "member": {
                    "name_surname": "denemeler",
                    "email": "osmanakol2@outlook.com",
                    "isJoinWebinar": false
                }
            }
         */
        const mongoose_session = mongoose.startSession()
        try {
            (await mongoose_session).startTransaction()
            const checkMember = await this._memberService.findOne({email:req.body.member.email},{},{lean:true, session:await mongoose_session})
            if (checkMember) {
                await (await mongoose_session).abortTransaction();
                (await mongoose_session).endSession();
                res.status(409).json({
                    status:"error"
                })
            } else {
                let teamDto:CtfTeamDto = new CtfTeamDto()
                teamDto = req.body.team as CtfTeamDto
                const team = await this._teamService.create(teamDto,{session:await mongoose_session})

                let memberDto:CtfMemberDto = new CtfMemberDto()
                memberDto = req.body.member as CtfMemberDto
                memberDto.team = team
                const member = await this._memberService.create(memberDto, {session:await mongoose_session})

                await (await mongoose_session).commitTransaction();
                (await mongoose_session).endSession();
                res.status(201).json({
                    status:"success",
                    data:member
                })
            }
            

        } catch (error) {
            await (await mongoose_session).abortTransaction();
            (await mongoose_session).endSession();
            res.status(400).json({
                status:"error",
                data:error
            })
        }
    }
    
    public addMemberToTeam = async (req:PublicRequest, res:Response, next:NextFunction) => {
        /**
         * ! Request Schema
         * {
         *      "member":{
         *          "name_surname": <name surname>,
         *          "email": <email>,
         *          "isJoinWebinar": <true or false>
         *      },
         *      "team_code":<team code>
         * }
         */
        const mongoose_session = mongoose.startSession()
        try {
            (await mongoose_session).startTransaction();
            let teamDto:CtfTeamDto = await this._teamService.findOne({team_code:req.body.team_code},{},{lean:true, session:await mongoose_session})
            if (teamDto){
                const checkMember = await this._memberService.findOne({email:req.body.member.email},{},{lean:true, session:await mongoose_session})
                if (checkMember) {
                    await (await mongoose_session).abortTransaction();
                    (await mongoose_session).endSession();
                    res.status(409).json({
                        status:"error"
                    })
                } else{
                    let memberDto:CtfMemberDto = new CtfMemberDto()
                    memberDto = req.body.member as CtfMemberDto
                    memberDto.team = teamDto
                    const member = await this._memberService.create(memberDto, {session:await mongoose_session})
    
                    await (await mongoose_session).commitTransaction();
                    (await mongoose_session).endSession();
                    res.status(201).json({
                        status:"success",
                        data:member
                    })
                }
            }
            else{
                await (await mongoose_session).abortTransaction();
                (await mongoose_session).endSession();
                res.status(401).json({
                    status: "error"
                })
            }
        } catch (error) {
            res.status(400).json({
                status:"error"
            })
        }
    }
}