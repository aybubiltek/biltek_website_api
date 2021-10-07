import { DocumentType } from '@typegoose/typegoose';
import { Document, FilterQuery, QueryOptions} from 'mongoose';
import { IModel } from '../../model/base.model';

export interface IRead<T extends IModel,K> {
   find(args: FilterQuery<T>, projection?:any ,options?: QueryOptions):Promise<Document[]>
   findOne(args:FilterQuery<T>, projection:any, options:QueryOptions):Promise<DocumentType<K> | null>
}