import { IWrite } from "../interface/IWrite";
import { IRead } from "../interface/IRead";
import {
  Model,
  Document,
  FilterQuery,
  QueryFindBaseOptions,
  CreateQuery,
  QueryUpdateOptions,
  UpdateQuery,
  SaveOptions,
  ModelOptions,
  QueryFindOptions
} from "mongoose";
import { DocumentType } from "@typegoose/typegoose";
import { User } from "../../lib/user/user.model";

export abstract class BaseRepository<T,K> implements IRead<T,K>, IWrite<T> {
  protected readonly _model: Model<Document>;

  constructor(model: Model<Document>) {
    this._model = model;
  }



  async findOne(args: FilterQuery<T>, projection: any, options: QueryFindBaseOptions): Promise<DocumentType<K> | null> {
    return await this._model.findOne(args, projection,options) as DocumentType<K>
  }
  
  async find(
    args: FilterQuery<T>,
    projection?:any,
    options?: QueryFindOptions
  ): Promise<Document[]> {
    return await this._model.find(args, projection, options);
  }

  async create(query: CreateQuery<T>, options?: SaveOptions): Promise<DocumentType<K>> {
    return await new this._model(query).save(options) as DocumentType<K>
  }
  
  async update(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryUpdateOptions
  ): Promise<Document> {
    return await this._model.updateOne(query, update, options);
  }

  async delete(query: FilterQuery<T>, options: ModelOptions): Promise<Boolean> {
    return await (await this._model.deleteOne(query, options)).deletedCount != 0
  }
}
