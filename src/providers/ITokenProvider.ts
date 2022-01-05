export interface ITokenProvider {
  generateToken(payload: Record<any, any>, KMSI: boolean): string;
}