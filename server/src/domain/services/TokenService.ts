export default interface TokenService {
  generateToken(payload: object): string | null;
  verifyToken(token: string): string | object;
  generateRefreshToken(payload: object): string | null;
  verifyRefreshToken(token: string): object | null;
}
