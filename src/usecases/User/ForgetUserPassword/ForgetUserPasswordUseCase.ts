import 'dotenv/config';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { ITokenProvider } from '../../../providers/ITokenProvider';
import { IMailProvider } from '../../../providers/IMailProvider';
import { IForgetUserPasswordRequestDTO } from './ForgetUserPasswordDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { User } from '../../../entities/User';
import { USER_RESET_PASSWORD_SECRET } from '../../../utils/secrets';

export class ForgetUserPasswordUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(data: IForgetUserPasswordRequestDTO): Promise<void> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const { email } = data;

    const user: User = await this.usersRepository.findByEmail(email);

    if (user) {
      const token: string = this.tokenProvider.generateToken(
        { id: user.user_id },
        USER_RESET_PASSWORD_SECRET,
        true,
      );

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
          subject: process.env.USER_RESET_PASSWORD_EMAIL_SUBJECT.replace(
            '{name}',
            user.name.split(' ')[0],
          ),
          body: process.env.USER_RESET_PASSWORD_EMAIL_BODY.replace(
            '{name}',
            user.name.split(' ')[0],
          ).replace('{token}', token),
        });
      } catch (err) {
        throw new ExecuteError({
          message: 'Unexpected error ocurred while sending email.',
          status: 500,
        });
      }
    }
  }
}
