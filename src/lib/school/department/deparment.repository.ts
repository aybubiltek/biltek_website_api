import { BaseRepository } from '../../../repository/base/BaseRepository';
import { DepartmentDto } from './department.dto';
import { Department } from './deparment.model';
export class DepartmentRepository extends BaseRepository<DepartmentDto, Department>{
    
}