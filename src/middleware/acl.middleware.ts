import { AuthRequest } from "../@types";
import Redis from "ioredis";
import { REDIS_OPTIONS } from "../config";
import { AclService } from "../lib/acl/acl.service";
import RoleModel from '../lib/acl/role-manager/role.model';
import { NextFunction, Response } from 'express';
import { AclDto, AclSchemaDto } from '../lib/acl/acl.dto';
import { Methods } from "../lib/acl/acl.model";
import { Unauthorized } from "../errors/http-errors";


const redis_connection = new Redis(REDIS_OPTIONS) 
const aclService:AclService = new AclService();
export const checkAcl =  () => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        const acls:AclDto[] = await getAcls() as unknown as AclDto[]
        const moduleAcl = acls.find(x=>x.moduleName == req.baseUrl.split('/')[1])
        if (moduleAcl){
            const roleAcl = moduleAcl.aclSchema.find(x=>x.role._id == req.session.roleId) as AclSchemaDto

            if(roleAcl && roleAcl.permission[req.method] === true){
               return next()
            }
        }
        next(new Unauthorized("Unauthorized process"));
      };
   
}

const getAcls = async ():Promise<string> => {
    let result;
    result = await redis_connection.get("acls")
    if (result == null){
        await setAcls()
        result = await redis_connection.get("acls")
    }
    return JSON.parse(result || "")
}

const setAcls = async () => {
    // Todo : yeni bir acl eklendiğinde, bir kullanıcıya rol atandığında vb. durumlarda redisdeki veride güncellenmeli.
    const acl = await aclService.find({}, {}, {lean:true , populate:{path:"aclSchema.role", 
    match:true, model: RoleModel}})
    
    await redis_connection.set("acls", JSON.stringify(acl), "EX", 60 * 60 * 6)
}