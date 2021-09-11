import { BaseRepository } from '../../repository/base/BaseRepository';
import { EventDto } from './event.dto';
import { Event } from './event.model';

export class EventRepository extends BaseRepository<EventDto, Event> {
    
}