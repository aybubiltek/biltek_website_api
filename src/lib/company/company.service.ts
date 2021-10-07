import { Service } from "../../interfaces/IService";
import { CompanyDto } from "./company.dto";
import CompanyModel from "./company.model";
import { CompanyRepository } from "./company.repository";

export class CompanyService extends Service<CompanyDto> {

    constructor(){
        super(new CompanyRepository(CompanyModel))
    }
    
}