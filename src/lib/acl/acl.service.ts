import { Service } from '../../interfaces/IService';
import { AclDto } from './acl.dto';
import AclModel from './acl.model';
import { AclRepository } from './acl.repository';


export class AclService extends Service<AclDto>{

    constructor(){
       super(new AclRepository(AclModel))
    }
  
}