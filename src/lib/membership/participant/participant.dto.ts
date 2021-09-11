import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsMongoId, IsOptional, ValidateNested } from "class-validator";
import { IModel } from "../../../model/base.model";
import { MemberShip } from '../membership.model';
import mongoose from 'mongoose';

export class ParticipantDto implements IModel{

    @IsOptional()
    @IsMongoId()
    _id:mongoose.Schema.Types.ObjectId

    @ValidateNested()
    @Type(() => MemberShip)
    membership:MemberShip

    @ValidateNested()
    @Type(() => Event)
    event: Event

    @IsBoolean()
    isJoin: boolean = false

    @IsOptional()
    @IsDate()
    createdAt?: Date

    @IsOptional()
    @IsDate()
    updatedAt?:Date
}