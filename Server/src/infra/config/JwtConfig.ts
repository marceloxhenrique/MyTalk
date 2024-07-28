export default interface JwtConfig {
  tokenSecret: string;
  tokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

export const JwtConfig: JwtConfig = {
  tokenSecret: process.env.JWT_TOKEN_SECRET ?? "MySuperSecret",
  tokenExpiresIn: process.env.JWT_TOKEN_EXPIRATION ?? "1h",
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET ?? "MySuperSecret1",
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION ?? "24h",
};
