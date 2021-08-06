import { IModel } from '../../../model/base.model';
import mongoose from 'mongoose';
import { IsMongoId, IsOptional, IsString, MinLength, IsDate, ValidateNested } from 'class-validator';
import { UniversityDto } from '../university/university.dto';
export class DepartmentDto implements IModel{
    @IsMongoId()
    @IsOptional()
    _id:mongoose.Schema.Types.ObjectId

    @IsString()
    @MinLength(5, {
        message: "It can not less then 5 characters"
    })
    departmentName:string

    @ValidateNested()
    university:UniversityDto

    @IsDate()
    createdAt?: Date
    
    @IsDate()
    updatedAt?: Date
}