import dotenv from 'dotenv'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IMailProvider } from '../../../providers/IMailProvider'
import { IVerifyUserRequestDTO } from './VerifyUserDTO'
import { JwtPayload, verify } from 'jsonwebtoken'
import { USER_VERIFICATION_SECRET } from '../../../utils/secrets'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../exceptions/ExecuteError'

dotenv.config()

export class VerifyUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: IVerifyUserRequestDTO): Promise<void> {
    const { token } = data;

    let payload: string | JwtPayload = null;
    try {
      payload = (verify(token, USER_VERIFICATION_SECRET));
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Invalid token.',
        },
        status: 401,
      });
    }

    if (typeof payload === 'string') {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Invalid token.',
        },
        status: 401,
      });
    }

    const { id } = payload;

    const user: User = await this.usersRepository.findById(id);

    if (!user) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User not found.',
        },
        status: 404,
      });
    }

    if (user.verified) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User already verified.',
        },
        status: 409,
      });
    }
  
    user.verified = true;

    await this.usersRepository.save(user);

    try {
      await this.mailProvider.sendMail({
        to: {
          email: user.email,
          name: user.name,
        },
        from: {
          email: process.env.NOREPLY_EMAIL_ADDRESS,
          name: process.env.NOREPLY_EMAIL_NAME,
        },
        subject: process.env.USER_VERIFIED_EMAIL_SUBJECT.replace('{name}', user.name.split(' ')[0]),
        body: process.env.USER_VERIFIED_EMAIL_BODY.replace('{name}', user.name),
      });

      await this.mailProvider.sendMail({
        to: {
          email: process.env.ROOT_EMAIL_ADDRESS,
          name: process.env.ROOT_EMAIL_NAME,
        },
        from: {
          email: process.env.NOREPLY_EMAIL_ADDRESS,
          name: process.env.NOREPLY_EMAIL_NAME,
        },
        subject: process.env.WRITER_AUTHORIZATION_REQUEST_EMAIL_SUBJECT.replace('{name}', user.name.split(' ')[0]),
        body: ((process.env.WRITER_AUTHORIZATION_REQUEST_EMAIL_BODY
          .replace('{user.email}', user.email))
          .replace('{user.name}', user.name))
          .replace('{request.date}', new Date().toISOString()),
      });
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Unexpected error ocurred while sending an email.',
        },
        status: 500,
      })
    }
  }
}