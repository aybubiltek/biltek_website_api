import { BaseRepository } from "../../../repository/base/BaseRepository";
import { ParticipantDto } from './participant.dto';
import { Participant } from "./participant.model";

export class ParticipantRepository extends BaseRepository<ParticipantDto, Participant> {
    
}