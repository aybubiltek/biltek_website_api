import { getModelForClass, pre, modelOptions, prop, DocumentType, Ref, index } from '@typegoose/typegoose';
import { CtfTeam } from '../team/ctf.team.model';

@modelOptions({schemaOptions: {collection: "ctfmembers", timestamps: true, toJSON:{virtuals:true}, toObject:{virtuals:true}}})
@index({email:1}, {unique:true})
export class CtfMember{

    @prop({ type: () => String, required:true, unique:true ,trim:true })
    public email: string;

    @prop({type: () => String, required:true})
    public name_surname: string

    @prop({type: () => Boolean, default:true})
    public isJoinCtf: boolean

    @prop({ref:CtfTeam})
    public team:Ref<CtfTeam>
    
}

const MemberModel = getModelForClass<typeof CtfMember>(CtfMember, {options: {customName: 'ctfmembers'}})

export default MemberModel