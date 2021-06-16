import { FilterQuery, QueryFindOptions, SaveOptions, UpdateQuery, QueryUpdateOptions, QueryFindBaseOptions } from 'mongoose';
import { IService } from '../../../interfaces/IService';
import { CtfTeamDto } from './ctf.team.dto';
import TeamModel from './ctf.team.model';
import { CtfTeamRepository } from './ctf.team.repository';
export class CtfTeamService implements IService<CtfTeamDto>{

    private _teamRepository:CtfTeamRepository

    constructor(){
        this._teamRepository = new CtfTeamRepository(TeamModel)
    }

    public async find(filter: FilterQuery<CtfTeamDto>, projection: any, options: QueryFindOptions): Promise<CtfTeamDto[]> {
        const result = await this._teamRepository.find(filter, projection, options)
        return result as unknown as CtfTeamDto[]
    }

    public async create(dtoItem: CtfTeamDto, options?: SaveOptions): Promise<CtfTeamDto> {
        const result = await this._teamRepository.create(dtoItem, options)
        return result as unknown as CtfTeamDto
    }


    public async update(filter: FilterQuery<CtfTeamDto>, updateQuery: UpdateQuery<CtfTeamDto>, options: QueryUpdateOptions): Promise<CtfTeamDto> {
        const result = await this._teamRepository.update(filter, updateQuery, options)
        return result as unknown as CtfTeamDto
    }


    public async findOne(filter: FilterQuery<CtfTeamDto>, projection: any, options: QueryFindBaseOptions): Promise<CtfTeamDto> {
        const result = await this._teamRepository.findOne(filter,projection, options)
        return result as unknown as CtfTeamDto
    }

    delete(): void {
        throw new Error('Method not implemented.');
    }

}