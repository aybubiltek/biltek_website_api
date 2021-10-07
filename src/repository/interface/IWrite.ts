import { IModel } from "../../model/base.model";
import { Document, FilterQuery, QueryOptions, SaveOptions, UpdateQuery, Query } from 'mongoose';

export interface IWrite<T extends IModel, K> {
  create(query: Query<T, K>, options?: SaveOptions): Promise<Document>;
  update(query: FilterQuery<T>, update:UpdateQuery<T>, options: QueryOptions): Promise<Document>;
  delete(query: FilterQuery<T>, options?: QueryOptions): Promise<Boolean>;
}
