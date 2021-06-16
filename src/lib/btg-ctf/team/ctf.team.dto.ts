import { mongoose } from '@typegoose/typegoose';
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { IModel } from '../../../model/base.model';

export class CtfTeamDto implements IModel{
    @IsMongoId()
    @IsOptional()
    _id: mongoose.Schema.Types.ObjectId

    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message:"Minumun length must be 3"})
    team_name:string

    @IsString()
    team_code:string

    @IsDate()
    createdAt?: Date
    
    @IsDate()
    updatedAt?: Date
}