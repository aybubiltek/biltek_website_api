import { Allow, IsBoolean, IsDate, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested, ValidateIf, IsAlpha, Matches } from 'class-validator';
import { CtfTeamDto } from '../team/ctf.team.dto';
import { IModel } from '../../../model/base.model';
import { Type } from "class-transformer";

export class CtfMemberDto implements IModel{
    @IsNotEmpty()
    @IsString()
    @IsEmail(undefined, {
        message:"Yanlış email"
    })
    email: string;

    @Matches("^[a-zA-ZiİşŞğĞüÜöÖçÇ ]+$")
    @IsNotEmpty()
    @IsString()
    @MinLength(5, {message:"It should be a real name"})
    name_surname:string

    @IsBoolean()
    isJoinCtf:boolean

    @ValidateIf(member => member.isJoinCtf === true)
    @ValidateNested()
    @Type(()=>CtfTeamDto)
    team:CtfTeamDto

    @IsDate()
    @IsOptional()
    createdAt?: Date
    
    @IsDate()
    @IsOptional()
    updatedAt?: Date

}