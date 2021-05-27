import { getModelForClass,pre, modelOptions, prop, DocumentType } from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "roles", timestamps: true, toJSON:{virtuals:true}, toObject:{virtuals:true}}})
export class Role{

    @prop({ type: () => String, required:true, trim:true })
    public roleName: string;

    @prop({type : () => Boolean, default:true})
    public isActive:boolean
    
}

const RoleModel = getModelForClass<typeof Role>(Role, {options: {customName: 'roles'}})
/*const kittenSchema = buildSchema(User)
const UserModel = addModelToTypegoose(mongoose.model('users', kittenSchema), User)*/
export default RoleModel