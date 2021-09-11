import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({schemaOptions: {
    collection: "events",
    timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}
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
        required:true,
        trim:true
    })
    public img:string

    @prop({
        type: () => Boolean,
        default:true
    })
    public isActive:boolean
}

const EventModel = getModelForClass<typeof Event>(Event, {options: {customName: "events"}})

export default EventModel