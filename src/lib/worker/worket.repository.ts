import { BaseRepository } from "../../repository/base/BaseRepository";
import { WorkerDto } from './worker.dto';
import { Worker } from "./worker.model";

export class WorkerRepository extends BaseRepository<WorkerDto, Worker> {
    
}