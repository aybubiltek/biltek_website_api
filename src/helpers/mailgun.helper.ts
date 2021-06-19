import mailgun from "mailgun-js";
import { MAILGUN_SETTINGS } from "../config";

export class Mailgun{
    private mg:mailgun.Mailgun 
    
    constructor(){
        this.mg = mailgun({apiKey:MAILGUN_SETTINGS.API_KEY || "", domain:MAILGUN_SETTINGS.DOMAIN || "", host:MAILGUN_SETTINGS.HOST})
    }

    public sendSingleMail = async (from:string, to:string, subject:string, text: string):Promise<any> => {
        try {
            const result = await this.mg.messages().send({from:from,to:to, subject:subject, html:text})

            return result
        } catch (error) {
            return error
        }
        
    }

}


