import { Service } from '../../../interfaces/IService';
import { CtfMemberDto } from './ctf.member.dto';
import MemberModel from './ctf.member.model';
import { CtfMemberRepository } from './ctf.member.repository';

export class CtfMemberService extends Service<CtfMemberDto>{

    constructor(){
      super(new CtfMemberRepository(MemberModel))
    }

}