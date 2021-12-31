import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'
import { SECRET } from '../utils/auth'

export default (request: Request, response: Response, next: NextFunction): Response | void => {
  const authHeader: string = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provided.' })
  }

  const [, token] = authHeader.split(' ')

  try {
    verify(token, SECRET)

    return next()
  } catch (err) {
    return response.status(401).json({ error: 'Invalid token.' })
  }
}