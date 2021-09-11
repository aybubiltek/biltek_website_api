import { BaseRepository } from "../../repository/base/BaseRepository";
import { MemberShipDto } from "./membership.dto";
import { MemberShip } from './membership.model';

export class MemberShipRepository extends BaseRepository<MemberShipDto, MemberShip> {
    
}