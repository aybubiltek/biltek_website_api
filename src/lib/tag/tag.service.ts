import { Service } from "../../interfaces/IService";
import { TagDto } from "./tag.dto";
import { TagRepository } from './tag.repository';
import TagModel from './tag.model';


export class TagService extends Service<TagDto> {
    
    constructor(){
        super(new TagRepository(TagModel))
    }
    
}