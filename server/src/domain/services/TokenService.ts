export default interface TokenService {
  generateToken(payload: object): string | null;
  verifyToken(token: string): object | null;
  generateRefreshToken(payload: object): string | null;
  verifyRefreshToken(token: string): object | null;
}
