import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

@modelOptions({schemaOptions: {collection: "universities", timestamps: true, toJSON:{virtuals:true}, toObject:{virtuals:true}}})
export class University{

    @prop({type: () => String, required:true, trim:true})
    public universityName:string

} 

const UniversityModel = getModelForClass<typeof University>(University, {options:{customName:"universities"}})

export default UniversityModel