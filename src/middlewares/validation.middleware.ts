import { plainToClass, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { RequestHandler, Response, Request } from 'express'
import { HttpException } from '~/exceptions/httpException'

type Value = 'body' | 'query' | 'params'
const validationMiddleware = (
  type: any,
  value: Value = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req: Request, res: Response, next) => {
    return validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const errorMessage = errors.map((error: ValidationError) => {
            return {
              field: error.property,
              message: Object.values(error.constraints as any)
            }
          })
          next(new HttpException(422, errorMessage))
        } else {
          next()
        }
      }
    )
  }
}

export default validationMiddleware
