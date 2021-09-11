import { transformAndValidate, TransformValidationOptions } from 'class-transformer-validator';
import express from 'express';

export const validationMiddleware = (model:any, options?:TransformValidationOptions) => {
    return async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        let errors = []
        try {
            const userObject = await transformAndValidate(model, req.body, options)
            console.info("validation success")
        } catch (error) {
            // Buraya validationları işleyecek bir fonksiyon gelecek
            errors = error as any[]
            console.error("validation error")
          
        }

        if (errors.length) {
            // !daha sonra buradaki validation işlemeleri daha düzgün yapılmalıdır
            if (process.env.NODE_ENV == "development") {
                res.status(422).json({
                    "status": "failed",
                    "message":"Validation error",
                    "error": errors
                })
            }
            
            res.status(422).json({
                "status": "failed",
                "message":"Eksik veya hatalı veri girdiniz, lütfen kontrol edip tekrar deneyiniz"
            })
        }
        else {
            next()
        }
    }
}