import { IModel } from '../../model/base.model';
import mongoose from 'mongoose';
import { IsBoolean, IsDate, IsISO8601, IsMongoId, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { UserDto } from '../user/user.dto';
import { Type } from 'class-transformer';
import { WorkerDto } from '../worker/worker.dto';

export class SpeakerDto implements IModel {
    @ValidateNested()
    @Type(() => WorkerDto)
    speaker:WorkerDto
    
    @IsString()
    topic: string

    @IsOptional()
    @IsISO8601()
    startTime:Date

    @IsOptional()
    @IsISO8601()
    finishTime:Date
}


export class EventDto implements IModel {
    @IsMongoId() 
    @IsOptional()
    _id:mongoose.Schema.Types.ObjectId

    @IsString()
    name:string

    @IsOptional()
    @IsString()
    @IsUrl()
    url:string

    @IsString()
    @IsUrl()
    img:string

    @ValidateNested()
    @Type(() => UserDto)
    moderator: UserDto

    @ValidateNested()
    @Type(() => SpeakerDto)
    speakers:SpeakerDto[]

    @IsBoolean()
    isActive:boolean

    @IsOptional()
    @IsISO8601()
    startDate:Date

    @IsOptional()
    @IsISO8601({strict:true})
    finishDate:Date

    @IsOptional()
    @IsDate()
    createdAt?: Date

    @IsOptional()
    @IsDate()
    updatedAt?:Date
}