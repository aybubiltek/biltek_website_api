import { Types } from "mongoose";

export const isValidObjectId = (id:string) => {
      
    if(Types.ObjectId.isValid(id)){
        if((String)(new Types.ObjectId(id)) === id)
            return true;        
        return false;
    }
    return false;
}