import { modelOptions, prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Tag } from "../tag/tag.model";

@modelOptions({schemaOptions:{
    collection: "companies",
    collation: {locale:"tr"},
    timestamps: true,
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
}})
export class Company {
    @prop({
        type: () => String,
        required:true,
        trim:true,
        uppercase:true
    })
    public name:string

    @prop({ref: Tag})
    public category:Ref<Tag>

    @prop({
        type: () => String
    })
    public logo:string

    @prop({
        type: () => String
    })
    public website:string

    @prop({
        type: () => String
    })
    public phone_number:string

    @prop({
        type: () => String
    })
    public email:string

}

const CompanyModel = getModelForClass<typeof Company>(Company, {
    options:{
        customName:"companies"
    }
})

export default CompanyModel