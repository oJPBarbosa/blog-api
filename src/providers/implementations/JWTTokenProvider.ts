import { ITokenProvider } from '../ITokenProvider'
import { sign } from 'jsonwebtoken'
import { SECRET } from '../../config/auth'

export class JWTTokenProvider implements ITokenProvider {
  generateToken(payload: Record<any, any>): string {
    return sign(payload, SECRET, {
      expiresIn: 86400,
    });
  }
}