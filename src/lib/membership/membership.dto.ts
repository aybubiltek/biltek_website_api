import { IModel } from '../../model/base.model';
import mongoose from 'mongoose';
import { IsDate, IsEmail, IsMongoId, IsOptional, IsPhoneNumber, IsString, MinLength, ValidateNested } from 'class-validator';
import { UniversityDto } from '../school/university/university.dto';
import { DepartmentDto } from '../school/department/department.dto';
import { isValidObjectId } from "../../utils/validation.util";
import { Type } from 'class-transformer';

export class MemberShipDto implements IModel {
    @IsMongoId()
    @IsOptional()
    _id:mongoose.Schema.Types.ObjectId

    @IsString()
    @MinLength(5, {message: "It can not less ten 5"})
    name_surname: string

    @IsEmail()
    @IsString()
    email: string

    @IsOptional()
    @IsPhoneNumber('TR')
    phone_number: string

    @ValidateNested()
    @Type(() => UniversityDto)
    university: UniversityDto

    @ValidateNested()
    @Type(() => DepartmentDto)
    department: DepartmentDto

    @IsOptional()
    @IsDate()
    createdAt?: Date

    @IsOptional()
    @IsDate()
    updatedAt?:Date
}