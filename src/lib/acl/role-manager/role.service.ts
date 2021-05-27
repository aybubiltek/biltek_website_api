import {
  FilterQuery,
  SaveOptions,
  UpdateQuery,
  QueryUpdateOptions,
  QueryFindBaseOptions,
} from "mongoose";
import { IService } from "../../../interfaces/IService";
import { RoleDto } from "./role.dto";
import RoleModel, { Role } from "./role.model";
import { RoleRepository } from "./role.repository";

export class RoleService implements IService<RoleDto> {
  private _roleRepository: RoleRepository;

  constructor() {
    this._roleRepository = new RoleRepository(RoleModel);
  }

  public async find(
    filter: FilterQuery<RoleDto>,
    projection: any
  ): Promise<RoleDto[]> {
    const result = await this._roleRepository.find(filter, projection, {
      lean: true,
    });
    return (result as unknown) as RoleDto[];
  }

  public async create(
    dtoItem: RoleDto,
    options?: SaveOptions
  ): Promise<RoleDto> {
    const result = await this._roleRepository.create(dtoItem, options);
    return (result as unknown) as RoleDto;
  }

  public async update(
    filter: FilterQuery<RoleDto>,
    updateQuery: UpdateQuery<RoleDto>,
    options: QueryUpdateOptions
  ): Promise<RoleDto> {
    const result = await this._roleRepository.update(
      filter,
      updateQuery,
      options
    );
    return (result as unknown) as RoleDto;
  }

  public async findOne(
    filter: FilterQuery<RoleDto>,
    projection: any,
    options: QueryFindBaseOptions
  ): Promise<RoleDto> {
    const result = await this._roleRepository.findOne(
      filter,
      projection,
      options
    );
    return result as RoleDto;
  }

  delete(): void {
    throw new Error("Method not implemented.");
  }
}
