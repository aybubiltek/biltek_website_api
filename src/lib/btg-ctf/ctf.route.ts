import IRoute from '../../interfaces/IRoute';
import { CtfController } from './ctf.controller';
import { Router } from 'express';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { CtfMemberDto } from './member/ctf.member.dto';
import { sendSingleMail } from '../../middleware/mail.middleware';
import { IModel } from '../../model/base.model';
export class CtfRoute implements IRoute{
    private _ctfController:CtfController

    moduleName:string;

    constructor() {
        this._ctfController = new CtfController()
        this.moduleName = "btg-ctf"
    }

    public CtfRoutes = ():Router => {
        this._ctfController.router.post("/team",validationMiddleware(CtfMemberDto, {
            validator: {stopAtFirstError:false, validationError:{target:false, value:false}}
        }), this._ctfController.createTeam, sendSingleMail("Break The Gleipnir <btg@aybubiltek.com>", "Hoşgeldiniz", "deneme"))

        this._ctfController.router.put("/team", validationMiddleware(CtfMemberDto ,{
            validator: { stopAtFirstError:false, validationError:{target:false, value:false}}}), this._ctfController.addMemberToTeam, sendSingleMail("Break The Gleipnir <btg@aybubiltek.com>", "Hoşgeldiniz", "deneme"))

        return this._ctfController.router;
    }

    public getPath = (): string => {
        return this._ctfController.path;
      };
}