import { DocumentType } from '@typegoose/typegoose';
import { BaseRepository } from '../../repository/base/BaseRepository';
import { UserDto } from './user.dto';
import { User } from './user.model';

export class UserRepository extends BaseRepository<UserDto, User>{

}