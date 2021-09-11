import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({schemaOptions: {
    collection: "tags",
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals:true}
}})
export class Tag{
    @prop({
        type: () => String,
        minlength:3,
        required:true,
        trim:true
    })
    public name:string

}

const TagModel = getModelForClass<typeof Tag>(Tag, {
    options: {customName:"tags"}
})

export default TagModel