import { modelOptions, prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { University } from '../university/university.model';

@modelOptions({schemaOptions:{collection:"departments", timestamps:true, toJSON:{virtuals:true}, toObject:{virtuals:true}}})
export class Department{
    
    @prop({type: () => String, required:true, trim:true})
    public departmentName:string

    @prop({ref: University})
    public university:Ref<University>
}

const DepartmentModel = getModelForClass<typeof Department>(Department, {options: {customName: "departments"}})

export default DepartmentModel