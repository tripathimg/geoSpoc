import jsonwebtoken from 'jsonwebtoken'
import { AUTH, JWT_CONFIG } from '../config'
import { httpStatus } from '../constants'
import { AppError } from '../utils'

export const apiKeyAuth = (req, res, next) => {
  let error
  const isjwtAuthPath = !JWT_CONFIG.NO_AUTH_PATHS.find(ele => ele.test(req.originalUrl))
  if (!isjwtAuthPath && AUTH.SIGNATURE_PATHS.find(ele => ele.test(req.originalUrl))) {
    if (!req.headers || !req.headers.signature) {
      error = new AppError('signature missing', httpStatus.UNAUTHORIZED)
    } else if (!AUTH.SIGNATURE.includes(req.headers.signature)) {
      error = new AppError('wrong signature', httpStatus.UNAUTHORIZED)
    }
  }
  return next(error)
}

export const validatedUser = (route) => async (req, res, next) => {
  const isNoAuth = JWT_CONFIG.NO_AUTH_PATHS.find(item => item.test(req.originalUrl))
  if (!isNoAuth) {
    return next(new AppError('Unauthorised user', httpStatus.FORBIDDEN))
  }
  next()
}

export const getTokenFromHeader = req => req && req.headers && req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : ''

export const createToken = obj => jsonwebtoken.sign(obj, JWT_CONFIG.SECERET, { expiresIn: JWT_CONFIG.TOKEN_VALIDITY })

export const verifyToken = async token => jsonwebtoken.verify(token, JWT_CONFIG.SECERET)
