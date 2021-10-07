import { modelOptions, prop, Ref, getModelForClass, index } from '@typegoose/typegoose';
import { University } from '../university/university.model';

@modelOptions({schemaOptions:{
    collation:{locale: "tr"},
    collection:"departments", 
    timestamps:true, 
    toJSON:{virtuals:true}, 
    toObject:{virtuals:true}
}})
//@index({university: 1})
export class Department{
    
    @prop({type: () => String, required:true, trim:true})
    public departmentName:string

    @prop({ref: University})
    public university:Ref<University>
}

const DepartmentModel = getModelForClass<typeof Department>(Department, {options: {customName: "departments"}})

/*DepartmentModel.syncIndexes().then(err => {
    console.log(err)
})*/

export default DepartmentModel