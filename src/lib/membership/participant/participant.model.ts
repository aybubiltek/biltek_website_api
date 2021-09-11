import { modelOptions, getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { MemberShip } from '../membership.model';
import { Event } from '../../event/event.model';

@modelOptions({schemaOptions:{
    collection: "participants",
    timestamps: true,
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
}})
export class Participant{

    @prop({ref: Event})
    public event:Ref<Event>

    @prop({ref: MemberShip})
    public membership:Ref<MemberShip>

    @prop({
        type: () => Boolean,
        required:true,
        default:false
    })
    public isJoin:boolean
}


const ParticipantModel = getModelForClass<typeof Participant>(Participant, {
    options:{customName: "participants"}
})

export default ParticipantModel