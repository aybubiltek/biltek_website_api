import mongoose, { mongo } from "mongoose";
import { ExcelOperation } from "../../helpers/excel";
import { DepartmentService } from "../../../lib/school/department/deparment.service";
import { UniversityService } from '../../../lib/school/university/university.service';
import { UniversityDto } from "../../../lib/school/university/university.dto";
import { DepartmentDto } from "../../../lib/school/department/department.dto";

const operation = new ExcelOperation("/home/osman/projects/biltek_website_api/src/scripts/migration/schools/Bölümler Hakkında Genel Bilgiler 26-07-2021.xls")


const readUniversityExcel = async () => {
    try {
        let temp : { [key: string]: Array<string> } = {}
        let data: { [key: string]: string[]; }[] = []
        const result = await operation.readXlsx()
        if(result !== undefined){
            result.worksheets[0].eachRow((row, rowNumber)=>{
                let universityName = row.getCell(1).value
                if (rowNumber != 1) {
                    if (result.worksheets[0].getRow(rowNumber - 1).getCell(1).value != universityName) {
                        data.push(temp)
                        temp = {}
                        temp[universityName as string] = []
                    }
                } else if (rowNumber == 1) {
                    temp[universityName as string] = []
                }
         
                //let universityName:string = row.getCell(0).toString()
                row.eachCell({includeEmpty:false},(cell, colNumber)=>{
                    if (colNumber == 2) {
                        if (cell.value) {
                            temp[universityName as string].push(cell.value as string)
                        }
                    }
                })
            })
        }
        console.log("finish read excel")
        return data
       
    } catch (error) {
        console.log(error)
    }
    
}


export const prepareDatabase = async () => {
    const universityService = new UniversityService()
    const departmentService = new DepartmentService()
    var data = await readUniversityExcel();
   
        const mongoose_session = mongoose.startSession();
        try {
            if (data !== undefined) {
                let created:boolean;
                let result;
                for (let index = 0; index < data.length; index++) {
                    for (let key in data[index]) {
                        (await mongoose_session).startTransaction;
                        let universityDto:UniversityDto = new UniversityDto();
                        universityDto.universityName = key
                        result = await universityService.create(universityDto,{session:await mongoose_session});
                        (await mongoose_session).commitTransaction;
                        (await mongoose_session).startTransaction;
                        for (let dep in data[index][key]) {
                            let departmentDto:DepartmentDto = new DepartmentDto()
                            departmentDto.departmentName = data[index][key][dep]
                            departmentDto.university = result as UniversityDto
                            await departmentService.create(departmentDto, {session:await mongoose_session});
                        }
                      
                        (await mongoose_session).commitTransaction;
                        (await mongoose_session).endSession;
                    } 
                }
               
            }
           
            return "success"
        } catch (error) {
            (await mongoose_session).abortTransaction;
            (await mongoose_session).endSession;
            return "error"
        }
    
   
}
