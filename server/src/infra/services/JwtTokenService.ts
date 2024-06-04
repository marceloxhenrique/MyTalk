import TokenService from "../../domain/services/TokenService";
import jwt from "jsonwebtoken";
import JwtConfig from "../config/JwtConfig";

export default class JwtTokenService implements TokenService {
  constructor(private readonly jwtConfig: JwtConfig) {}
  generateToken(payload: object): string {
    return jwt.sign(payload, this.jwtConfig.tokenSecret, {
      expiresIn: this.jwtConfig.tokenExpiresIn,
    });
  }
  verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, this.jwtConfig.tokenSecret) as { sub: string };
    } catch (error) {
      throw new Error("Token verification failed");
    }
  }
  generateRefreshToken(payload: object): string {
    return jwt.sign(payload, this.jwtConfig.refreshTokenSecret, {
      expiresIn: this.jwtConfig.refreshTokenExpiresIn,
    });
  }
  verifyRefreshToken(token: string): object | null {
    try {
      return jwt.verify(token, this.jwtConfig.refreshTokenSecret) as { sub: string };
    } catch (error) {
      throw new Error("Refresh Token verification failed");
    }
  }
}
