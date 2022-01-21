import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IShowUserRequestDTO } from './ShowUserDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { User } from '../../../entities/User';

export class ShowUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IShowUserRequestDTO): Promise<object[] | object> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const { all, user_id, verified, authorized } = data;

    if (all) {
      const users: User[] = await this.usersRepository.findAll();

      return users.map((user: User) => {
        return {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          biography: {
            en: user.biography_en,
            pt: user.biography_pt,
          },
          authorized: user.authorized,
          verified: user.verified,
        };
      });
    }

    if (user_id) {
      const user: User = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new ExecuteError({
          message: 'User not found.',
          status: 404,
        });
      }

      return {
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        biography: {
          en: user.biography_en,
          pt: user.biography_pt,
        },
        authorized: user.authorized,
        verified: user.verified,
      };
    }

    if (verified && authorized) {
      const users: User[] = await this.usersRepository.findAll();

      return users
        .map((user: User) => {
          if (user.verified && user.authorized) {
            return {
              email: user.email,
              name: user.name,
              avatar: user.avatar,
              biography: {
                en: user.biography_en,
                pt: user.biography_pt,
              },
              authorized: user.authorized,
              verified: user.verified,
            };
          }
        })
        .filter((user: object) => {
          if (user !== null) {
            return user;
          }
        });
    }

    if (!verified && !authorized) {
      const users: User[] = await this.usersRepository.findAll();

      return users
        .map((user: User) => {
          if (!user.verified && !user.authorized) {
            return {
              email: user.email,
              name: user.name,
              avatar: user.avatar,
              biography: {
                en: user.biography_en,
                pt: user.biography_pt,
              },
              authorized: user.authorized,
              verified: user.verified,
            };
          }
        })
        .filter((user: object) => {
          if (user !== null) {
            return user;
          }
        });
    }

    if (verified && !authorized) {
      const users: User[] = await this.usersRepository.findAll();

      return users
        .map((user: User) => {
          if (user.verified && !user.authorized) {
            return {
              email: user.email,
              name: user.name,
              avatar: user.avatar,
              biography: {
                en: user.biography_en,
                pt: user.biography_pt,
              },
              authorized: user.authorized,
              verified: user.verified,
            };
          }
        })
        .filter((user: object) => {
          if (user !== null) {
            return user;
          }
        });
    }

    if (!verified && authorized) {
      const users: User[] = await this.usersRepository.findAll();

      return users
        .map((user: User) => {
          if (!user.verified && user.authorized) {
            return {
              email: user.email,
              name: user.name,
              avatar: user.avatar,
              biography: {
                en: user.biography_en,
                pt: user.biography_pt,
              },
              authorized: user.authorized,
              verified: user.verified,
            };
          }
        })
        .filter((user: object) => {
          if (user !== null) {
            return user;
          }
        });
    }

    if (verified) {
      const users: User[] = await this.usersRepository.findAll();

      return users
        .map((user: User) => {
          if (user.verified) {
            return {
              email: user.email,
              name: user.name,
              avatar: user.avatar,
              biography: {
                en: user.biography_en,
                pt: user.biography_pt,
              },
              authorized: user.authorized,
              verified: user.verified,
            };
          }
        })
        .filter((user: object) => {
          if (user !== null) {
            return user;
          }
        });
    }

    if (!verified) {
      const users: User[] = await this.usersRepository.findAll();

      return users
        .map((user: User) => {
          if (!user.verified) {
            return {
              email: user.email,
              name: user.name,
              avatar: user.avatar,
              biography: {
                en: user.biography_en,
                pt: user.biography_pt,
              },
              authorized: user.authorized,
              verified: user.verified,
            };
          }
        })
        .filter((user: object) => {
          if (user !== null) {
            return user;
          }
        });
    }

    if (authorized) {
      const users: User[] = await this.usersRepository.findAll();

      return users
        .map((user: User) => {
          if (user.authorized) {
            return {
              email: user.email,
              name: user.name,
              avatar: user.avatar,
              biography: {
                en: user.biography_en,
                pt: user.biography_pt,
              },
              authorized: user.authorized,
              verified: user.verified,
            };
          }
        })
        .filter((user: object) => {
          if (user !== null) {
            return user;
          }
        });
    }

    if (!authorized) {
      const users: User[] = await this.usersRepository.findAll();

      return users
        .map((user: User) => {
          if (!user.authorized) {
            return {
              email: user.email,
              name: user.name,
              avatar: user.avatar,
              biography: {
                en: user.biography_en,
                pt: user.biography_pt,
              },
              authorized: user.authorized,
              verified: user.verified,
            };
          }
        })
        .filter((user: object) => {
          if (user !== null) {
            return user;
          }
        });
    }
  }
}
