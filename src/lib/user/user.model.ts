import { getModelForClass,pre, modelOptions, prop, DocumentType, Ref } from "@typegoose/typegoose";
import { compare, hash } from "bcryptjs";
import { createHash, createHmac, timingSafeEqual } from "crypto";
import { APP_SECRET, BCRYPT_WORK_FACTOR, EMAIL_VERIFICATION_TIMEOUT, PORT } from '../../config';
import { Types } from "mongoose";
import { Role } from '../acl/role-manager/role.model';



@pre<User>('save', async function (){
    if(this.isModified('password')){
        this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
    }
})

@modelOptions({schemaOptions: {collection: "users", timestamps: true, toJSON:{virtuals:true}, toObject:{virtuals:true}}})
export class User{
    /*@prop()
    public _id: Types.ObjectId*/

    @prop({ type: () => String, required:true, trim:true })
    public email: string;

    @prop({type: () => String, required:true})
    public name_surname: string

    @prop({type: () => String, required:true})
    public password:string

    @prop({ref: Role})
    public roleId:Ref<Role>

    @prop({type: () => Date, required:false})
    public verifiedDate:Date

    public async matchesPassword(this:DocumentType<User> ,password:string):Promise<boolean>{
        return await compare(password, this.password)
    }

    public verificationUrl(id:string):string{
        const token = createHash('sha1').update(this.email).digest('hex')
        const expires = Date.now() + EMAIL_VERIFICATION_TIMEOUT
        
        const url = `127.0.0.1:${PORT}/email/verify?id=${id}&${token}&${expires}`
        const signature = UserModel.signVerificationUrl(url)

        return `${url}&signature=${signature}`
    }

    public static signVerificationUrl(url:string){
        return createHmac("sha256", APP_SECRET).update(url).digest("hex")
    }

    public static hasValidVerificationUrl(path:string, query:any){
        const url = `127.0.0.1:${PORT}${path}`
        const original = url.slice(0, url.lastIndexOf('&'))
        const signature = UserModel.signVerificationUrl(original)

        return timingSafeEqual(Buffer.from(signature), Buffer.from(query.signature)) && +query.expires > Date.now()
    }
    
}

const UserModel = getModelForClass<typeof User>(User, {options: {customName: 'users'}})
/*const kittenSchema = buildSchema(User)
const UserModel = addModelToTypegoose(mongoose.model('users', kittenSchema), User)*/
export default UserModel