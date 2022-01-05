export interface ITwoFactorAuthenticateUserRequestDTO {
  user_id: string;
  token: string;
  KMSI: boolean;
}