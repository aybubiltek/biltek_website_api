import IRoute from '../../interfaces/IRoute';
import { tags } from "../../applications/acl.module.conf.json";
import { TagController } from './tag.controller';
import { Router } from 'express';
import { checkIsLoggedIn } from '../../middleware/auth.middleware';
import { checkAcl } from '../../middleware/acl.middleware';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { TagDto } from './tag.dto';

export class TagRoute implements IRoute {
    
    private _tagController:TagController

    moduleName:string

    constructor(){
        this.moduleName = tags
        this._tagController = new TagController()
    }

    public getRoutes():Router{
        this._tagController.router.get(
            "/",
            checkIsLoggedIn(),
            checkAcl(),
            this._tagController.getTags
        )

        this._tagController.router.get(
            "/:id",
            checkIsLoggedIn(),
            checkAcl(),
            this._tagController.getTagById
        )

        this._tagController.router.post(
            "/",
            checkIsLoggedIn(),
            checkAcl(),
            validationMiddleware(TagDto, {
                validator: {
                    skipMissingProperties: true,
                    stopAtFirstError: false
                }
            }),
            this._tagController.addTag
        )

        this._tagController.router.put(
            "/",
            checkIsLoggedIn(),
            checkAcl(),
            validationMiddleware(TagDto, {
                validator: {
                    skipMissingProperties: true,
                    stopAtFirstError: false
                }
            }),
            this._tagController.updateTag
        )


        return this._tagController.router
    }

    public getPath = ():string => {
        return this._tagController.path
    }
}