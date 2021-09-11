import { Service } from "../../interfaces/IService";
import { WorkerDto } from "./worker.dto";
import WorkerModel from "./worker.model";
import { WorkerRepository } from "./worket.repository";

export class WorkerService extends Service<WorkerDto> {
    
    constructor(){
        super(new WorkerRepository(WorkerModel))
    }
    
}