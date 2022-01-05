import { ITokenProvider } from '../ITokenProvider'
import { sign } from 'jsonwebtoken'
import { SECRET } from '../../utils/auth'

export class JWTTokenProvider implements ITokenProvider {
  generateToken(payload: Record<any, any>, KMSI: boolean): string {
    const options: object = KMSI ? {} : { expiresIn: '3d' };

    return sign(payload, SECRET, options);
  }
}