export interface ICreateUserRequestDTO {
  email: string;
  password: string;
  name: string;
  avatar: string;
  authorized: boolean;
}