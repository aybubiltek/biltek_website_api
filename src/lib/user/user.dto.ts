import { IsDate, IsEmail, IsMongoId, IsOptional, IsString, MinLength, ValidateNested, } from "class-validator";
import { IModel } from "../../model/base.model";
import mongoose from 'mongoose';
import { RoleDto } from '../acl/role-manager/role.dto';
import { Type } from "class-transformer";

export class UserDto implements IModel{
    @IsMongoId()
    @IsOptional()
    _id: mongoose.Schema.Types.ObjectId

    @IsString()
    @IsEmail(undefined, {
        message: "Mail yanlış"
    })
    email: string

    @IsString()
    @MinLength(5, {
        message: 'It can not be a name'
    })
    name_surname: string

    password:string

    @ValidateNested()
   // @Type(() => RoleDto)
    role:RoleDto

    @IsOptional()
    @IsDate()
    verifiedDate:Date

    @IsOptional()
    @IsDate()
    createdAt?: Date
    
    @IsOptional()
    @IsDate()
    updatedAt?: Date

    /*constructor(email:string, name_surname:string){
        this.email = email
        this.name_surname = name_surname
    }*/
}