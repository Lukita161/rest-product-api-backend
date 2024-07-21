import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
export const handleErrors = (req: Request, res: Response, next: NextFunction)=> {
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(404).json({error: errors.array()})
    }
    next()
}