import { IsBoolean, IsDate, IsEmail, IsMongoId, IsOptional, IsString, } from "class-validator";
import { IModel } from "../../../model/base.model";
import mongoose from 'mongoose';

export class RoleDto implements IModel{
    @IsMongoId()
    @IsOptional()
    _id: mongoose.Schema.Types.ObjectId

    @IsString()
    roleName: string

    @IsBoolean()
    isActive:boolean

    @IsDate()
    createdAt?: Date
    
    @IsDate()
    updatedAt?: Date
}