import { Service } from '../../interfaces/IService';
import { UserDto } from './user.dto';
import UserModel from './user.model';
import { UserRepository } from './user.repository';

export class UserService extends Service<UserDto>{
    
    constructor(){
        super(new UserRepository(UserModel))
    }

}