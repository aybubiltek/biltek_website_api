import { Service } from '../../interfaces/IService';
import { EventDto } from './event.dto';
import { EventRepository } from './event.repository';
import EventModel from './event.model';

export class EventService extends Service<EventDto>{
    
    constructor(){
        super(new EventRepository(EventModel))
    }

}