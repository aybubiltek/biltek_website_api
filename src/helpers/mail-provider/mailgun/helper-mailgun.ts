import mailgun, {Mailgun} from "mailgun-js";
import { MAILGUN_SETTINGS } from '../../../config';
import { promises as fsp } from "fs";
import { compile, precompile } from "handlebars";

export class Mailer {

    private mg:Mailgun
    private template_file_path:string="src/helpers/mail-provider/mail-templates/"

    constructor(){
        this.mg = new mailgun({
            apiKey: MAILGUN_SETTINGS.API_KEY || "", 
            domain: MAILGUN_SETTINGS.DOMAIN || "", 
            host: MAILGUN_SETTINGS.HOST
        })
    }

    public addMember = async (list_name:string, member_name:string, member_email:string, variable:{} = {}) => {
        const list = this.mg.lists(`${list_name}@${MAILGUN_SETTINGS.DOMAIN}`)
        try {
            const result = await list.members().create({
                subscribed: true,
                address: member_email,
                name: member_name,
                vars: variable
            })
            return result
        } catch (error) {
            return error
        }
    }

    public addManyMembers = async (list_name:string, members:mailgun.lists.MemberAddMultipleData) => {
        try {
            return await this.mg.lists(`${list_name}@${MAILGUN_SETTINGS.DOMAIN}`).members().add(members)
        } catch (error) {
            return error
        }
    }

    public updateMember = async (list_name:string, member_email:string, name:string, subscribed:boolean, variable:{} = {}) => {
        try {
            return await this.mg.lists(`${list_name}@${MAILGUN_SETTINGS.DOMAIN}`).members(member_email).update({
                name: name, 
                subscribed: subscribed, 
                vars: variable
            })
        } catch (error) {
            return error
        }
    }

    public getMember = async (list_name:string, member_email:string) => {
        try {
            return await this.mg.lists(`${list_name}@${MAILGUN_SETTINGS.DOMAIN}`).members(member_email)
        } catch (error) {
            return error
        }
    }

    public deleteList = async (list_name:string) => {
        try {
            return await this.mg.lists(`${list_name}@${MAILGUN_SETTINGS.DOMAIN}`).delete()
        } catch (error) {
            return error
        }
    }

    public getLists = async () => {
        try {
            return await this.mg.get("/lists")
        } catch (error) {
            return error
        }
    }

    public getListInfo = async (list_name:string) => {
        try {
            return await this.mg.lists(`${list_name}@${MAILGUN_SETTINGS.DOMAIN}`).info()
        } catch (error) {
            return error
        }
    }

    public getListMembers = async (list_name:string) => {
        try {
            return await this.mg.lists(`${list_name}@${MAILGUN_SETTINGS.DOMAIN}`).members().list()
        } catch (error) {
            return error
        }
    }

    public createList = async (list_name:string, description:string = "") => {
        try {
            return await this.mg.post("/lists", {"address": `${list_name}@${MAILGUN_SETTINGS.DOMAIN}`, "description": description, "reply_preference": "sender"})
        } catch (error) {
            return error
        }
    }

    private sendMessageOneReceiver = async (from_mail:string, visible_from:string ,to_mail:string, subject:string, message_content:string, inline:string | string[] = "") => {
        try {
            let data:mailgun.messages.SendData = {
                from: `${visible_from} <${from_mail}>`,
                to: to_mail,
                subject: subject,
                html: message_content,
                inline:inline,
                "o:tracking": true,
                "o:tracking-clicks": true,
                "o:tracking-opens": true
            }
            return await this.mg.messages().send(data)
        } catch (error) {
            return error
        }
    }
    
    private sendMessageMailList = async (list_name:string, visible_from:string ,from_mail:string, subject:string, message_content:string, inline:string | string[] = "") => {
        try {
            let data:mailgun.messages.SendData = {
                from: `${visible_from} <${from_mail}>`,
                to: `${list_name}@${MAILGUN_SETTINGS.DOMAIN}`,
                subject: subject,
                html: message_content,
                inline: inline,
                "o:tracking": true,
                "o:tracking-clicks": true,
                "o:tracking-opens": true
            }
            return await this.mg.messages().send(data)
        } catch (error) {
            return error
        }
    }

    private renderTemplate = async (template_file:string, data:{} = {}, inline:Array<string> = []) => {
        try {
            const content = await fsp.readFile(this.template_file_path + template_file, {encoding:"utf-8"})
            let temp_inline:Array<string> = []
            if (content && inline.length > 0) {
                for (const value of inline) {
                    temp_inline.push(this.template_file_path + "img/" + value)
                }
            }
            const template = compile(content)
            const html = template(data)
            return {html, temp_inline}
        } catch (error) {
            console.error(error)
        }
    }

    public sendMessageWithHtml = async (from_mail:string, visible_from:string ,to_mail:string, subject:string, template_path:string, data:{} = {},  inline:Array<string> = [],
        is_mail_list:boolean = false) => {
        try {
            let {html, temp_inline} = await this.renderTemplate(template_path, data, inline) || {html:"", temp_inline:Array<string>()}
            if (is_mail_list){
                return await this.sendMessageMailList(to_mail, visible_from ,from_mail, subject, html, temp_inline)
            }
            return await this.sendMessageOneReceiver(from_mail, visible_from, to_mail, subject, html, temp_inline)
        } catch (error) {
            return error
        }
    }

    public sendMessageWithText = async (from_mail:string, visible_from:string, to_mail:string, subject:string, text:string, is_mail_list:boolean = false) => {
        try {
            if (is_mail_list) {
                return await this.sendMessageMailList(to_mail, visible_from ,from_mail, subject, "")
            }
            return await this.sendMessageOneReceiver(from_mail, visible_from, to_mail, subject, "")
        } catch (error) {
            return error
        }
    }
}