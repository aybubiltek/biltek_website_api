import { FilterQuery, QueryFindOptions, SaveOptions, UpdateQuery, QueryUpdateOptions, QueryFindBaseOptions } from 'mongoose';
import { IService, Service } from '../../../interfaces/IService';
import { DepartmentDto } from './department.dto';
import { DepartmentRepository } from './deparment.repository';
import DepartmentModel from './deparment.model';

export class DepartmentService extends Service<DepartmentDto>{
    
    //private _departmentRepository: DepartmentRepository

    constructor(){
        super(new DepartmentRepository(DepartmentModel));
        //this._departmentRepository = new DepartmentRepository(DepartmentModel)
    }

    /*async find(filter: FilterQuery<DepartmentDto>, projection: any, options: QueryFindOptions): Promise<DepartmentDto[]> {
        const result = await this._departmentRepository.find(filter, projection, options)
        return result as unknown as DepartmentDto[]
    }
    async create(dtoItem: DepartmentDto, options?: SaveOptions): Promise<DepartmentDto> {
        const result = await this._departmentRepository.create(dtoItem, options)
        return result as unknown as DepartmentDto
    }
    async update(filter: FilterQuery<DepartmentDto>, updateQuery: UpdateQuery<DepartmentDto>, options: QueryUpdateOptions): Promise<DepartmentDto> {
        const result = await this._departmentRepository.update(filter, updateQuery, options)
        return result as unknown as DepartmentDto
    }
    async findOne(filter: FilterQuery<DepartmentDto>, projection: any, options: QueryFindBaseOptions): Promise<DepartmentDto> {
        const result = await this._departmentRepository.findOne(filter, projection, options)
        return result as unknown as DepartmentDto
    }
    delete(): void {
        throw new Error('Method not implemented.');
    }*/

}