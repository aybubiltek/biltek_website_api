import { UserService } from "./user.service";

export class UserController{
    private _userService:UserService

    constructor(){
        this._userService = new UserService()        
    }

    
}