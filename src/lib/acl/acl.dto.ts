import { Allow, IsBoolean, IsDate, IsEmail, IsMongoId, IsOptional, IsString, ValidateNested, } from "class-validator";
import { IModel } from "../../model/base.model";
import mongoose from 'mongoose';
import { RoleDto } from "./role-manager/role.dto";


export class AclSchemaDto implements IModel{
    @ValidateNested()
    role:RoleDto

    /**
     * ! Verileri okurken oluşan hata nedeniyle Map sınıfını kullanmak yerine
     * ! typescript bize sunduğu dictionary yapısına geçiş yapıldı
     */
    @Allow()
    permission:{[key:string]:boolean} = {}
}

export class AclDto implements IModel{
    @IsMongoId()
    @IsOptional()
    _id: mongoose.Schema.Types.ObjectId

    @IsString()
    moduleName: string

    @ValidateNested()
    aclSchema:AclSchemaDto[]

    @IsDate()
    createdAt?: Date
    
    @IsDate()
    updatedAt?: Date
}