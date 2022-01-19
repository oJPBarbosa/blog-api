import { ITokenProvider } from '../ITokenProvider';
import { sign } from 'jsonwebtoken';

export class JWTTokenProvider implements ITokenProvider {
  generateToken(
    payload: Record<any, any>,
    secret: string,
    KMSI: boolean,
  ): string {
    const options: object = KMSI ? {} : { expiresIn: '3d' };

    return sign(payload, secret, options);
  }
}
