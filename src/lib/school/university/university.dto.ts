import { IModel } from '../../../model/base.model';
import mongoose from 'mongoose';
import { IsMongoId, IsOptional, IsString, MinLength, IsDate } from 'class-validator';

export class UniversityDto implements IModel{
    @IsMongoId()
    @IsOptional()
    _id:mongoose.Schema.Types.ObjectId

    @IsString()
    @MinLength(5, {
        message:"It can not less then 5 characters"
    })
    universityName:string

    @IsDate()
    createdAt?: Date
    
    @IsDate()
    updatedAt?: Date
}