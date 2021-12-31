export interface ITokenProvider {
  generateToken(payload: Record<any, any>): string;
}