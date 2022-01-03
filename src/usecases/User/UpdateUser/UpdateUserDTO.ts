export interface UpdateUserRequestDTO {
  user_id: string;
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  authorized?: boolean;
  verified?: boolean;
  root?: boolean;
}