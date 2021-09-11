import { IModel } from '../../model/base.model';
import { Types } from 'mongoose';
import { IsDate, IsEmail, IsMongoId, IsOptional, IsPhoneNumber, IsString, MinLength, ValidateNested } from 'class-validator';
import { CompanyDto } from '../company/company.dto';
import { Type } from 'class-transformer';
import { TagDto } from '../tag/tag.dto';

export class WorkerDto implements IModel{
    
    @IsMongoId()
    @IsOptional()
    _id:Types.ObjectId

    @IsString()
    @MinLength(5, {message:"It can not less then 5"})
    name_surname:string

    @IsEmail()
    @IsString()
    email:string

    @IsOptional()
    @IsPhoneNumber("TR")
    phone_number:string

    @ValidateNested()
    @Type(() => CompanyDto)
    company:CompanyDto

    @ValidateNested()
    @Type(() => TagDto)
    title:TagDto

    @IsOptional()
    @IsDate()
    createdAt?: Date

    @IsOptional()
    @IsDate()
    updatedAt?:Date
}