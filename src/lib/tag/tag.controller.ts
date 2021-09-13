import IController from "../../interfaces/IController";
import { TagService } from "./tag.service";
import { tags } from "../../applications/acl.module.conf.json";
import { NextFunction, Response, Router } from "express";
import { AuthRequest } from "../../@types";
import { TagDto } from './tag.dto';


export class TagController implements IController {
    private _tagService: TagService

    path = "/" + tags
    router = Router()

    constructor(){
        this._tagService = new TagService()
    }

    public addTag = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            let tagDto:TagDto = new TagDto()
            tagDto = req.body as TagDto

            const result = await this._tagService.create(tagDto, {})

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


    public updateTag = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            const tag = await this._tagService.update({_id: req.body.id}, {
                name: req.body.name
            }, {})
            
            res.status(200).json({
                status: "success",
                data: tag 
            })

        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }

    public getTags = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            const tags = await this._tagService.find({}, {}, {lean:true})

            res.status(200).json({
                status: "success",
                data: tags
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }

    public getTagById = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            const tag = await this._tagService.findOne({_id:req.params.id as any}, {name:1}, {lean:true})

            res.status(200).json({
                status: "success",
                data: tag
            })
        } catch (error) {
            res.status(400).json({
                status: "error"
            })
        }
    }
}