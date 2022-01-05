export interface IBiography {
  en?: string;
  pt?: string;
}

export interface UpdateUserRequestDTO {
  user_id: string;
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  biography?: IBiography;
  authorized?: boolean;
  verified?: boolean;
  root?: boolean;
}