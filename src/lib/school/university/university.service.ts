import { IService, Service } from '../../../interfaces/IService';
import { UniversityDto } from './university.dto';
import UniversityModel from './university.model';
import { UniversityRepository } from './university.repository';

export class UniversityService extends Service<UniversityDto>{

    //private _universityRepository: UniversityRepository
    constructor(){
        super(new UniversityRepository(UniversityModel));
    }

    /*async find(filter: FilterQuery<UniversityDto>, projection: any, options: QueryFindOptions): Promise<UniversityDto[]> {
        const result = await this._universityRepository.find(filter, projection, options)
        return result as unknown as UniversityDto[]
    }
    async create(dtoItem: UniversityDto, options?: SaveOptions): Promise<UniversityDto> {
        const result = await this._universityRepository.create(dtoItem, options)
        return result as unknown as UniversityDto
    }
    async update(filter: FilterQuery<UniversityDto>, updateQuery: UpdateQuery<UniversityDto>, options: QueryUpdateOptions): Promise<UniversityDto> {
        const result = await this._universityRepository.update(filter, updateQuery, options)
        return result as unknown as UniversityDto
    }
    async findOne(filter: FilterQuery<UniversityDto>, projection: any, options: QueryFindBaseOptions): Promise<UniversityDto> {
        const result = await this._universityRepository.findOne(filter, projection, options)
        return result as unknown as UniversityDto
    }
    delete(): void {
        throw new Error('Method not implemented.');
    }*/

}