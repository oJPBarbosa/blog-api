import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { ShowUserRequestDTO } from './ShowUserDTO'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../exceptions/ExecuteError'

export class ShowUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ShowUserRequestDTO): Promise<object[] | object> {
    const { all, user_id, verified, authorized } = data;

    if (all) {
      return (await this.usersRepository.findAll()).map((user: User) => {
        return {
          id: user.user_id,
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
          _message: {
            key: 'error',
            value: 'User not found.',
          },
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
      return (await this.usersRepository.findAll()).map((user: User) => {
        if (user.verified && user.authorized) {
          return {
            id: user.user_id,
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
      }).filter((user: object) => { if (user !== null) return user });
    }

    if (!verified && !authorized) {
      return (await this.usersRepository.findAll()).map((user: User) => {
        if (!user.verified && !user.authorized) {
          return {
            id: user.user_id,
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
      }).filter((user: object) => { if (user !== null) return user });
    }

    if (verified && !authorized) {
      return (await this.usersRepository.findAll()).map((user: User) => {
        if (user.verified && !user.authorized) {
          return {
            id: user.user_id,
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
      }).filter((user: object) => { if (user !== null) return user });
    }

    if (!verified && authorized) {
      return (await this.usersRepository.findAll()).map((user: User) => {
        if (!user.verified && user.authorized) {
          return {
            id: user.user_id,
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
      }).filter((user: object) => { if (user !== null) return user });
    }

    if (verified) {
      return ((await this.usersRepository.findAll()).map((user: User) => {
        if (user.verified) {
          return {
            id: user.user_id,
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
      })).filter((user: object) => { if (user !== null) return user });
    }

    if (!verified) {
      return (await this.usersRepository.findAll()).map((user: User) => {
        if (!user.verified) {
          return {
            id: user.user_id,
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
      }).filter((user: object) => { if (user !== null) return user });
    }

    if (authorized) {
      return (await this.usersRepository.findAll()).map((user: User) => {
        if (user.authorized) {
          return {
            id: user.user_id,
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
      }).filter((user: object) => { if (user !== null) return user });
    }

    if (!authorized) {
      return (await this.usersRepository.findAll()).map((user: User) => {
        if (!user.authorized) {
          return {
            id: user.user_id,
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
      }).filter((user: object) => { if (user !== null) return user });
    }
  }
}