import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { University } from '../school/university/university.model';
import { Department } from '../school/department/deparment.model';

@modelOptions({schemaOptions: {
    collection: "memberships", timestamps:true, toJSON:{virtuals:true}, toObject:{virtuals:true}
}})
export class MemberShip{
    @prop({type: () => String, required:true, trim:true})
    public name_surname:string

    @prop({type: () => String, required:true, trim:true, unique:true})
    public email:string
    
    @prop({type: () => String})
    public phone_number:string

    @prop({ref: University})
    public university:Ref<University>

    @prop({ref: Department})
    public department:Ref<Department>
}

const MemberShipModel = getModelForClass<typeof MemberShip>(MemberShip, {options: {customName: "memberships"}})

export default MemberShipModel