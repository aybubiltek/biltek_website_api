import { DocumentType } from '@typegoose/typegoose';
import { Document, FilterQuery, QueryFindBaseOptions, QueryFindOptions} from 'mongoose';
import { IModel } from '../../model/base.model';

export interface IRead<T extends IModel,K> {
   find(args: FilterQuery<T>, projection?:any ,options?: QueryFindOptions):Promise<Document[]>
   findOne(args:FilterQuery<T>, projection:any, options:QueryFindBaseOptions):Promise<DocumentType<K> | null>
}