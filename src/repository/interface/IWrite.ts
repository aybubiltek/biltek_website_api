import { IModel } from "../../model/base.model";
import { CreateQuery, Document, FilterQuery, ModelOptions, ModelUpdateOptions, QueryUpdateOptions, SaveOptions, UpdateQuery } from 'mongoose';

export interface IWrite<T extends IModel> {
  create(query: CreateQuery<T>, options?: SaveOptions): Promise<Document>;
  update(query: FilterQuery<T>, update:UpdateQuery<T>, options: QueryUpdateOptions): Promise<Document>;
  delete(query: FilterQuery<T>, options?: ModelOptions): Promise<Boolean>;
}
