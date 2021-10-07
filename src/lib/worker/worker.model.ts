import { modelOptions, prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Tag } from "../tag/tag.model";
import { Company } from "../company/company.model";

@modelOptions({schemaOptions:{
    collection: "workers",
    collation: {locale: "tr"},
    timestamps: true,
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
}})
export class Worker{
    @prop({
        type: () => String,
        required:true,
        trim:true
    })
    public name_surname:string

    @prop({
        type: () => String,
        required:true,
        unique:true,
        trim:true
    })
    public email:string

    @prop({
        type: () => String
    })
    public phone_number:string

    @prop({ref: Company})
    public company:Ref<Company>

    @prop({ref: Tag})
    public title:Ref<Tag>    
}

const WorkerModel = getModelForClass<typeof Worker>(Worker, {
    options: {
        customName: "workers"
    }
})

export default WorkerModel