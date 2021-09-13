import { modelOptions, prop, getModelForClass, index } from '@typegoose/typegoose';

@modelOptions({schemaOptions: {
    collation: {locale: 'tr'},
    collection: "universities", 
    timestamps: true, 
    toJSON:{virtuals:true}, 
    toObject:{virtuals:true}
}})
//@index({ universityName:1 }, {})
export class University{

    @prop({
        type: () => String, 
        required:true, 
        trim:true
    })
    public universityName:string

} 

const UniversityModel = getModelForClass<typeof University>(University, {options:{customName:"universities"}})
UniversityModel.syncIndexes().then(err => {
    console.log(err)
})
export default UniversityModel