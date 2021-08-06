import { Workbook } from "exceljs";

export class ExcelOperation{
    private _filePath:string
    
    constructor(filePath:string){
        this._filePath = filePath
    }

    public readXlsx = async () => {
        const workbook = new Workbook()
        try {
            const result = await workbook.xlsx.readFile("/home/osman/projects/biltek_website_api/src/scripts/migration/schools/bolumler.xlsx")
           
            return result
        } catch (error) {
            console.log(error)
        }
       
       
    }

    private readCsv = () => {
        
    }

}