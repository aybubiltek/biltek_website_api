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
    private _mailText:string;


    path = "/ctf"
    router = Router()

    constructor(){
        this._memberService = new CtfMemberService()
        this._teamService = new CtfTeamService()
        this._mailText = `Break The Gleipnir ‘a hoş geldin !
        
        <br><br>Ankara Yıldırım Beyazıt Üniversitesi <b>Bilim ve Teknoloji Topluluğu</b> tarafından düzenlenen ödüllü Jeopardy / Attack – Defense türündeki siber güvenlik yarışmamız için geri sayım sürüyor. 
        
        <br><br>Yarışma süresince eğlence, bilgi ve rekabetin yanında bayrakları toplayarak sürpriz çekilişleri ve büyük ödülleri kazanmak istiyorsan <b>7  Ağustos</b>’da ekibinle veya bireysel olarak hazır olmayı unutma !
        
        <br><br>Yarışmaya özel discord sunucumuza katılarak, duyurulardan haberdar olabilir ve aklındaki soru işaretlerini giderebilirsin. Discord sunucumuza katılmak için <a href='https://discord.gg/TCFKpy2nDu'>tıklayınız</a>.<br> 
         
        <br><br>Break The Gleipnir ‘da görüşünceye dek bize ulaşabileceğin sosyal medya hesaplarımız için <a href='https://linktr.ee/biltek'>tıklayınız</a><br><br>
        
        <b>7 Ağustos'da</b> görüşmek üzere !<br><br>`
    }

    public createTeam = async (req:PublicRequest, res:Response, next:NextFunction) => {
        /**
         * ! Request schema
         * {
                "team": {
                    "team_name": "deneme2"
                },
                "name_surname": "denemeler",
                "email": "osmanakol2@outlook.com",
                "isJoinCtf": false
            }
         */
        //const mongoose_session = mongoose.startSession()
        try {
            /*(await mongoose_session).startTransaction()
            const checkMember = await this._memberService.findOne({email:req.body.email},{},{lean:true, session:await mongoose_session})
            if (checkMember) {
                await (await mongoose_session).abortTransaction();
                (await mongoose_session).endSession();
                res.status(409).json({
                    status:"error",
                    message:"Girmiş olduğunuz email adresi daha önceden kullanılmıştır."
                })
            } else {
                let memberDto:CtfMemberDto = new CtfMemberDto()
                memberDto = req.body as CtfMemberDto
                
                const team = await this._teamService.create(memberDto.team as CtfTeamDto,{session:await mongoose_session})
                memberDto.team = team
                let edited_text = this._mailText
                edited_text += `Takım kodun:<b>${team.team_code}</b><br> Bu kod ile ekibini genişletebilir ve  ekip arkadaşlarını ekibine dahil edebilirsin `
                const member = await this._memberService.create(memberDto, {session:await mongoose_session})

                await (await mongoose_session).commitTransaction();
                (await mongoose_session).endSession();
                /*res.status(201).json({
                    status:"success",
                    data:member
                })
                req.body.team_code = member.team.team_code
                req.body.mail_text = edited_text;
                next()
            }*/
            res.status(400).json({
                status:"success",
                message:"Ctf kayıtlarımız bitti. İlginiz için teşekkür ederiz"
            })

        } catch (error) {
            //await (await mongoose_session).abortTransaction();
            //(await mongoose_session).endSession();
            res.status(400).json({
                status:"error",
                message:"Bir hata oluştu, lütfen tekrar deneyiniz"
            })
        }
    }
    
    public addMemberToTeam = async (req:PublicRequest, res:Response, next:NextFunction) => {
        /**
         * ! Request Schema
         * {
         *      "name_surname": <name surname>,
         *      "email": <email>,
         *      "isJoinCtf": <true or false>
         *      team:{
         *          "team_code":<team code>
         *      }
         * }
         */
        //const mongoose_session = mongoose.startSession()
        try {
            /*(await mongoose_session).startTransaction();
            let teamDto:CtfTeamDto = await this._teamService.findOne({team_code:req.body.team.team_code},{},{lean:true, session:await mongoose_session})
            if (teamDto){
                const checkMember = await this._memberService.findOne({email:req.body.email},{},{lean:true, session:await mongoose_session})
                if (checkMember) {
                    await (await mongoose_session).abortTransaction();
                    (await mongoose_session).endSession();
                    res.status(409).json({
                        status:"error",
                        message:"Girmiş olduğunuz email adresi daha önceden kullanılmıştır."
                    })
                } else{
                    let memberDto:CtfMemberDto = new CtfMemberDto()
                    memberDto = req.body as CtfMemberDto
                    memberDto.team = teamDto
                    if(teamDto.total_member != 4){
                        teamDto.total_member++;
                        await this._teamService.update({team_code:teamDto.team_code},{total_member:teamDto.total_member},{session:await mongoose_session})
                        const member = await this._memberService.create(memberDto, {session:await mongoose_session})
    
                        await (await mongoose_session).commitTransaction();
                        (await mongoose_session).endSession();
                        /*res.status(201).json({
                            status:"success",
                            data:member
                        })
                        req.body.email = req.body.email
                        req.body.mail_text = this._mailText
                        next()
                    } else {
                        res.status(400).json({
                            status:"error",
                            message:"Takımımız maximum kişi sayısına ulaşmıştır. Bir takım en fazla 4 kişi olabilir."
                        })
                    }
                   
                   
                }
                
            }
            else{
                await (await mongoose_session).abortTransaction();
                (await mongoose_session).endSession();
                res.status(401).json({
                    status: "error",
                    message: "Yanlış takım kodu girdiniz."
                })
            }*/
            res.status(400).json({
                status:"success",
                message:"Ctf kayıtlarımız bitti. İlginiz için teşekkür ederiz"
            })
        } catch (error) {
            res.status(400).json({
                status:"error",
                message:"Bir hata oluştu, lütfen tekrar deneyiniz"
            })
        }
    }

    public addMember = async (req:PublicRequest, res:Response, next:NextFunction) =>{
        const mongoose_session = mongoose.startSession()
        try {
            (await mongoose_session).startTransaction();
            const checkMember = await this._memberService.findOne({email:req.body.email},{},{lean:true, session:await mongoose_session})
            if (checkMember) {
                await (await mongoose_session).abortTransaction();
                (await mongoose_session).endSession();
                res.status(409).json({
                    status:"error",
                    message:"Girmiş olduğunuz email adresi daha önceden kullanılmıştır."
                })
            } else {
                let memberDto:CtfMemberDto = new CtfMemberDto()
                memberDto = req.body as CtfMemberDto

                const member = await this._memberService.create(memberDto, {session:await mongoose_session})
    
                await (await mongoose_session).commitTransaction();
                (await mongoose_session).endSession();
                req.body.mail_text = this._mailText
                next()
            }
        } catch (error) {
            await (await mongoose_session).abortTransaction();
            (await mongoose_session).endSession();
            res.status(401).json({
                status: "error",
                message:"Bir hata oluştu, lütfen tekrar deneyiniz"
            })
        }
    }
}