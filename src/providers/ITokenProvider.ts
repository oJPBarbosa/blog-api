export interface ITokenProvider {
  generateToken(
    payload: Record<any, any>,
    secret: string,
    KMSI: boolean,
  ): string;
}
