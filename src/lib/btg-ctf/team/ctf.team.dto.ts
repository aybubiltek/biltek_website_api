import { mongoose } from '@typegoose/typegoose';
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';
import { IModel } from '../../../model/base.model';

export class CtfTeamDto implements IModel{
    @IsMongoId()
    @IsOptional()
    _id: mongoose.Schema.Types.ObjectId

    @ValidateIf(team => team.team_code === undefined)
    @IsNotEmpty()
    @IsString()
    @MaxLength(75)
    @MinLength(3, {message:"Minumun length must be 3"})
    team_name:string

    @ValidateIf(team => team.team_name === undefined)
    @IsNotEmpty()
    @IsString()
    team_code:string

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(4)
    total_member:number

    @IsDate()
    @IsOptional()
    createdAt?: Date
    
    @IsDate()
    @IsOptional()
    updatedAt?: Date
}