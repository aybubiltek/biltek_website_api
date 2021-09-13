import { IWrite } from "../interface/IWrite";
import { IRead } from "../interface/IRead";
import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  SaveOptions,
  QueryOptions,
  Query
} from "mongoose";
import { DocumentType, ReturnModelType } from "@typegoose/typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";

export abstract class BaseRepository<T,K> implements IRead<T,K>, IWrite<T, K> {
  protected readonly _model: ModelType<K>;

  constructor(model: ModelType<K>) {
    this._model = model;
  }



  async findOne(args: FilterQuery<T>, projection: any, options: QueryOptions): Promise<DocumentType<K> | null> {
    // @ts-ignore
    return await this._model.findOne(args, projection,options) as DocumentType<K>
  }
  
  async find(
    args: FilterQuery<T>,
    projection?:any,
    options?: QueryOptions
  ): Promise<Document[]> {
      // @ts-ignore
    return await this._model.find(args, projection, options);
  }

  // @ts-ignore
  async create(query: Query<T, K>, options?: SaveOptions): Promise<DocumentType<K>> {
    return await new this._model(query).save(options) as DocumentType<K>
  }
  
  async update(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions
  ): Promise<Document> {
          // @ts-ignore
    return await this._model.updateOne(query, update, options);
  }

  // @ts-ignore
  async delete(query: FilterQuery<T>, options: QueryOptions): Promise<Boolean> {
    // @ts-ignore
    return await (await this._model.deleteOne(query, options)).deletedCount != 0
  }
}
