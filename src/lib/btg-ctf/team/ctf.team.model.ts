import { getModelForClass,pre, modelOptions, prop, index} from "@typegoose/typegoose";
import { nolookalikesSafe } from "nanoid-dictionary";
import { customAlphabet } from "nanoid/async";

@pre<CtfTeam>('save', async function () {
    const nanoid = customAlphabet(nolookalikesSafe, 10)
    this.team_code = await nanoid()
})

@modelOptions({schemaOptions: {collection: "ctfteams", timestamps: true, toJSON:{virtuals:true}, toObject:{virtuals:true}}})
@index({team_code:1}, {unique:true})
export class CtfTeam{
    /*@prop()
    public _id: Types.ObjectId*/

    @prop({ type: () => String, required:true, trim:true })
    public team_name: string;

    @prop({type: () => String})
    public team_code: string

    @prop({type: () => Number, required:true, default:1, max:4, min:1})
    public total_member:number
}

const TeamModel = getModelForClass<typeof CtfTeam>(CtfTeam, {options: {customName: 'ctfteams'}})

export default TeamModel