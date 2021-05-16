import { IModel } from "../model/base.model";
import { FilterQuery, SaveOptions,UpdateQuery, QueryUpdateOptions } from 'mongoose';

export interface IService<T extends IModel>{
    find(filter:FilterQuery<T>, projection:any):Promise<T[]>
    create(dtoItem:T, options?: SaveOptions):Promise<T>
    update(filter:FilterQuery<T>, updateQuery:UpdateQuery<T>, options:QueryUpdateOptions):Promise<T>
    delete():void
}