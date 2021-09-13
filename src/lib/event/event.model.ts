import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from '../user/user.model';
import { Worker } from '../worker/worker.model';

export class Speaker{

    @prop({ref:Worker})
    public speaker:Ref<Worker>

    @prop({
        type: () => String
    })
    public topic:string

    @prop({
        type: () => Date
    })
    public startTime:Date


    @prop({
        type: () => Date
    })
    public finishTime:Date
}


@modelOptions({schemaOptions: {
    collection: "events",
    collation: {locale: "tr"},
    timestamps: true, 
    toJSON: {virtuals: true}, 
    toObject: {virtuals: true}
}})
export class Event{
    @prop({
        type: () => String, 
        required:true, 
        unique:true, 
        trim:true
    })
    public name:string

    @prop({
        type: () => String
    })
    public url:string

    @prop({
        type: () => String,
        trim:true
    })
    public img:string

    @prop({ref: User})
    public moderator:Ref<User>

    @prop({_id:false, type: () => [Speaker]})
    public speakers:Speaker[]

    @prop({
        type: () => Date
    })
    public startDate:Date


    @prop({
        type: () => Date
    })
    public finishDate:Date

    @prop({
        type: () => Boolean,
        default:true
    })
    public isActive:boolean
}

const EventModel = getModelForClass<typeof Event>(Event, {options: {customName: "events"}})

export default EventModel