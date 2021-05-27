import { FilterQuery, SaveOptions, UpdateQuery, QueryUpdateOptions, QueryFindBaseOptions } from 'mongoose';
import { IService } from '../../interfaces/IService';
import { AclDto } from './acl.dto';
import AclModel from './acl.model';
import { AclRepository } from './acl.repository';

export class AclService implements IService<AclDto>{
    private _aclRepository:AclRepository;

    constructor(){
        this._aclRepository = new AclRepository(AclModel);
    }
    
    
    public async findOne(filter: FilterQuery<AclDto>, projection: any, options: QueryFindBaseOptions): Promise<AclDto> {
        const result = await this._aclRepository.findOne(filter, projection, options)
        return result as unknown as AclDto
    }

    public async find(filter: FilterQuery<AclDto>, projection: any): Promise<AclDto[]> {
        const result = await this._aclRepository.find(filter,projection, {lean:true})
        return result as unknown as AclDto[];
    }

    public async create(dtoItem: AclDto, options?: SaveOptions): Promise<AclDto> {
        const result = await this._aclRepository.create(dtoItem, options);
        return result as unknown as AclDto;
    }
    public async update(filter: FilterQuery<AclDto>, updateQuery: UpdateQuery<AclDto>, options: QueryUpdateOptions): Promise<AclDto> {
        const result = await this._aclRepository.update(filter, updateQuery, options);
        return result as unknown as AclDto;
    }
    delete(): void {
        throw new Error('Method not implemented.');
    }

}