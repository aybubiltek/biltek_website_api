import { transformAndValidate, TransformValidationOptions } from 'class-transformer-validator';
import express from 'express';

export const validationMiddleware = (model:any, options?:TransformValidationOptions) => {
    return async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        let errors = []
        try {
            const userObject = await transformAndValidate(model, req.body, options)
            console.log(userObject)
        } catch (error) {
            // Buraya validationları işleyecek bir fonksiyon gelecek
            errors = error
            console.log(error)
          
        }

        if (errors.length) {
            res.status(422).json({
                "status": "failed",
                "error": errors
            })
        }
        else {
            next()
        }
    }
}