import IRoute from '../../interfaces/IRoute';
import { CtfController } from './ctf.controller';
import { Router } from 'express';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { CtfMemberDto } from './member/ctf.member.dto';
export class CtfRoute implements IRoute{
    private _ctfController:CtfController

    moduleName:string;

    constructor() {
        this._ctfController = new CtfController()
        this.moduleName = "btg-ctf"
    }

    public CtfRoutes = ():Router => {
        this._ctfController.router.post("/team",validationMiddleware(CtfMemberDto, {
            validator: {skipMissingProperties:true, stopAtFirstError:false}
        }), this._ctfController.createTeam)

        this._ctfController.router.put("/team", validationMiddleware(CtfMemberDto, {
            validator: {skipMissingProperties:true, stopAtFirstError:false}
        }), this._ctfController.addMemberToTeam)

        return this._ctfController.router;
    }

    public getPath = (): string => {
        return this._ctfController.path;
      };
}