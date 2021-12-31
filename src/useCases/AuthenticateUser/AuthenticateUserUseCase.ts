import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO'
import { User } from '../../entities/User'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { config } from '../../config/auth'

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IAuthenticateUserRequestDTO): Promise<string | null> {
    const user: User = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('User does not exists.');
    }

    const passwordMatches = await compare(data.password, user.password);

    if (!passwordMatches) {
      throw new Error('Invalid password.');
    }

    const token = sign(
      {
        id: user.id, 
      }, 
      config.secret, 
      {
        expiresIn: 86400,
      }
    );

    return token;
  }
}