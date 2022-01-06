import dotenv from 'dotenv'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { ITokenProvider } from '../../../providers/ITokenProvider'
import { IMailProvider } from '../../../providers/IMailProvider'
import { IForgetUserPasswordRequestDTO } from './ForgetUserPasswordDTO'
import { analyseDTO } from '../../../errors/DTOError'
import { User } from '../../../entities/User'
import { USER_RESET_PASSWORD_SECRET } from '../../../utils/secrets'
import { ExecuteError } from '../../../errors/ExecuteError'

dotenv.config()

export class ForgetUserPasswordUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(data: IForgetUserPasswordRequestDTO): Promise<void>{
    try {
      analyseDTO(data);
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: err.message,
        },
        status: 400,
      });
    }
    
    const { email } = data;

    const user: User = await this.usersRepository.findByEmail(email);

    if (user) {
      const token: string = this.tokenProvider.generateToken({ id: user.user_id }, USER_RESET_PASSWORD_SECRET, true );

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
          subject: process.env.USER_RESET_PASSWORD_EMAIL_SUBJECT
            .replace('{name}', user.name.split(' ')[0]),
          body: (process.env.USER_RESET_PASSWORD_EMAIL_BODY
            .replace('{name}', user.name.split(' ')[0]))
            .replace('{token}', token),
        });
      } catch (err) {
      console.log(err)
        throw new ExecuteError({
          _message: {
            key: 'error',
            value: 'Unexpected error ocurred while sending an email.',
          },
          status: 500,
        });
      }
    }
  }
}