import { BaseRepository } from '../../repository/base/BaseRepository';
import { TagDto } from './tag.dto';
import { Tag } from './tag.model';

export class TagRepository extends BaseRepository<TagDto, Tag>{

}