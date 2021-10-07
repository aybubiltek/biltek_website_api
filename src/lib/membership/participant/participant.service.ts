import { ParticipantDto } from './participant.dto';
import { ParticipantRepository } from './participant.repository';
import ParticipantModel from './participant.model';
import { Service } from '../../../interfaces/IService';


export class ParticipantService extends Service<ParticipantDto> {

    constructor(){
        super(new ParticipantRepository(ParticipantModel))
    }
    
}
