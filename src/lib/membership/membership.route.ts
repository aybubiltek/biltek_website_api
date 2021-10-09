import { Router } from "express";
import IRoute from "../../interfaces/IRoute";
import { memberships } from "../../applications/acl.module.conf.json";
import { MemberShipController } from './membership.controller';
import { checkIsLoggedIn } from '../../middleware/auth.middleware';
import { checkAcl } from "../../middleware/acl.middleware";
import { validationMiddleware } from '../../middleware/validation.middleware';
import { MemberShipDto } from './membership.dto';

export class MemberShipRoute implements IRoute{
    private _membershipController:MemberShipController

    moduleName:string

    constructor(){
        this.moduleName = memberships
        this._membershipController = new MemberShipController()
    }

    public getRoutes():Router{
        this._membershipController.router.get(
            "/",
            checkIsLoggedIn(),
            checkAcl(),
            this._membershipController.listAllMemberShip
        )

        this._membershipController.router.post(
            "/",
            validationMiddleware(MemberShipDto, {
                validator:{
                    skipMissingProperties:true,
                    stopAtFirstError:false
                }
            }),
            this._membershipController.addMemberShip
        )

        this._membershipController.router.put(
            "/",
            validationMiddleware(MemberShipDto, {
                validator: {
                    skipMissingProperties: true,
                    stopAtFirstError: false
                }
            }),
            this._membershipController.updateMemberShip
        )


        this._membershipController.router.delete(
            "/",
            checkIsLoggedIn(),
            checkAcl(),
            this._membershipController.deleteMemberShip
        )

        this._membershipController.router.get(
            "/:id",
            checkIsLoggedIn(),
            checkAcl(),
            this._membershipController.getMemberById
        )

        this._membershipController.router.post(
            "/participate",
            this._membershipController.participateEvent
        )
        
        return this._membershipController.router
    }



    public getPath = ():string => {
        return this._membershipController.path
    }
}