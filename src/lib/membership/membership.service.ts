import { Service } from "../../interfaces/IService";
import { MemberShipDto } from "./membership.dto";
import { MemberShipRepository } from "./membership.repository";
import MemberShipModel from './membership.model';

export class MemberShipService extends Service<MemberShipDto> {

    constructor(){
        super(new MemberShipRepository(MemberShipModel))
    }
}
