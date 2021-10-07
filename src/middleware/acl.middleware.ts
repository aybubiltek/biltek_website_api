import { AuthRequest } from "../@types";
import { AclService } from "../lib/acl/acl.service";
import RoleModel from '../lib/acl/role-manager/role.model';
import { NextFunction, Response } from 'express';
import { AclDto, AclSchemaDto } from '../lib/acl/acl.dto';
import { Unauthorized } from "../errors/http-errors";
import redisUtil from "../utils/redis.util";


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
    result = await redisUtil.getAcls("acls")
    if (result == null){
        const acl = await aclService.find({}, {}, {lean:true, populate: {path:"aclSchema.role", model:RoleModel, match:true}})
        await redisUtil.setAcls("acls", JSON.stringify(acl), "EX", 60 * 60 * 6)
        result = await redisUtil.getAcls("acls")
    }
    return JSON.parse(result || "")
}