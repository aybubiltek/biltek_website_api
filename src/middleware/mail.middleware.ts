import { NextFunction, Response } from "express";
import { PublicRequest } from "../@types";
import { Mailgun } from "../helpers/mailgun.helper";
export const sendSingleMail = (from:string, subject:string, text:string) => {
    return async (req: PublicRequest, res: Response, next: NextFunction) => {
      const mail:Mailgun = new Mailgun()
      try {
          const result = await mail.sendSingleMail(from, req.body.email, subject, req.body.mail_text)
          console.info(result)
          res.status(201).json({
              status:"success",
              message:"Kaydınız başarılı bir şekilde  gerçekleşmiştir."
          })
      } catch (error) {
          console.error(error)
          res.status(400).json({
            status:"error",
            "message": ""
        });
      }
    };
  };