import { IModel } from '../../model/base.model';
import mongoose from 'mongoose';
import { IsDate, IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';

export class TagDto implements IModel {
    @IsMongoId()
    @IsOptional()
    _id:mongoose.Schema.Types.ObjectId

    @IsString()
    @MinLength(3, {message: "Tag length should be less then 3"})
    name:string

    @IsOptional()
    @IsDate()
    createdAt?: Date

    @IsOptional()
    @IsDate()
    updatedAt?:Date
}