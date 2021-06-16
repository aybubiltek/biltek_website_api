import { FilterQuery, QueryFindOptions, SaveOptions, UpdateQuery, QueryUpdateOptions, QueryFindBaseOptions } from 'mongoose';
import { IService } from '../../../interfaces/IService';
import { CtfMemberDto } from './ctf.member.dto';
import MemberModel from './ctf.member.model';
import { CtfMemberRepository } from './ctf.member.repository';
export class CtfMemberService implements IService<CtfMemberDto>{

    private _memberRepository:CtfMemberRepository

    constructor(){
        this._memberRepository = new CtfMemberRepository(MemberModel)
    }

    public async find(filter: FilterQuery<CtfMemberDto>, projection: any, options: QueryFindOptions): Promise<CtfMemberDto[]> {
        const result = await this._memberRepository.find(filter, projection, options)
        return result as unknown as CtfMemberDto[]
    }

    public async create(dtoItem: CtfMemberDto, options?: SaveOptions): Promise<CtfMemberDto> {
        const result = await this._memberRepository.create(dtoItem, options)
        return result as unknown as CtfMemberDto
    }


    public async update(filter: FilterQuery<CtfMemberDto>, updateQuery: UpdateQuery<CtfMemberDto>, options: QueryUpdateOptions): Promise<CtfMemberDto> {
        const result = await this._memberRepository.update(filter, updateQuery, options)
        return result as unknown as CtfMemberDto
    }


    public async findOne(filter: FilterQuery<CtfMemberDto>, projection: any, options: QueryFindBaseOptions): Promise<CtfMemberDto> {
        const result = await this._memberRepository.findOne(filter,projection, options)
        return result as unknown as CtfMemberDto
    }

    delete(): void {
        throw new Error('Method not implemented.');
    }

}