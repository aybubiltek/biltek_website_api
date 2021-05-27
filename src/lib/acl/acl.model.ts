import { getModelForClass,pre, modelOptions, prop, DocumentType, Ref } from "@typegoose/typegoose";
import { Role } from "./role-manager/role.model";

export enum Methods{
    GET="GET",
    PUT="PUT",
    POST="POST",
    DELETE="DELETE"
}

export class AclSchema{
    @prop({ref: Role})
    public role:Ref<Role>

    @prop({type: () => Boolean})
    public permission:Map<Methods,boolean>
}


@modelOptions({schemaOptions: {collection: "acl", timestamps: true, toJSON:{virtuals:true}, toObject:{virtuals:true}}})
export class Acl{

    @prop({ type: () => String, required:true, trim:true })
    public moduleName: string;

    @prop({_id:false, type: () => [AclSchema]})
    public aclSchema:AclSchema[]
    
}

const AclModel = getModelForClass<typeof Acl>(Acl, {options: {customName: 'acl'}})
/*const kittenSchema = buildSchema(User)
const UserModel = addModelToTypegoose(mongoose.model('users', kittenSchema), User)*/
export default AclModel