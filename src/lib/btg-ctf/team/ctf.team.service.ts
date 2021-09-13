import { Service } from '../../../interfaces/IService';
import { CtfTeamDto } from './ctf.team.dto';
import TeamModel from './ctf.team.model';
import { CtfTeamRepository } from './ctf.team.repository';
export class CtfTeamService extends Service<CtfTeamDto>{

    constructor(){
        super(new CtfTeamRepository(TeamModel))
    }

}