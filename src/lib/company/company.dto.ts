import { IModel } from '../../model/base.model';
import mongoose from 'mongoose';
import { IsDate, IsEmail, IsMongoId, IsOptional, IsPhoneNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { TagDto } from '../tag/tag.dto';
import { Type } from 'class-transformer';


export class CompanyDto implements IModel {
    @IsMongoId()
    @IsOptional()
    _id: mongoose.Schema.Types.ObjectId

    @IsString()
    name: string

    @ValidateNested()
    @Type(() => TagDto)
    category: TagDto

    @IsOptional()
    @IsUrl()
    logo: string

    @IsOptional()
    @IsUrl()
    website:string

    @IsOptional()
    @IsPhoneNumber("TR")
    phone_number: string

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsDate()
    createdAt?: Date

    @IsOptional()
    @IsDate()
    updatedAt?:Date
}