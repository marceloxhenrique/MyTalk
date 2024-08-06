import JwtTokenService from "../src/infra/services/JwtTokenService";
import { JwtConfig } from "../src/infra/config/JwtConfig";
describe("JwtTokenService", () => {
  it("Should generate a token", () => {
    const jwtTokenservice = new JwtTokenService(JwtConfig);
    const token = jwtTokenservice.generateToken({ sub: "123456" });
    expect(token).toBeDefined();
  });
  it("Should verify the token", () => {
    const payload = "123456";
    const jwtTokenservice = new JwtTokenService(JwtConfig);
    const token = jwtTokenservice.generateToken({ sub: payload });
    const tokenVerified = jwtTokenservice.verifyToken(token);
    expect(tokenVerified).toEqual(payload);
  });
  it("Should generate a refreshToken", () => {
    const jwtTokenservice = new JwtTokenService(JwtConfig);
    const refreshToken = jwtTokenservice.generateRefreshToken({ sub: "123456" });
    expect(refreshToken).toBeDefined();
  });
  // it("Should verify the refreshToken", () => {
  //   const payload = "123456";
  //   const jwtTokenservice = new JwtTokenService(JwtConfig);
  //   const refreshToken = jwtTokenservice.generateRefreshToken({ sub: payload });
  //   const refreshTokenVerified = jwtTokenservice.verifyRefreshToken(refreshToken);
  //   expect(refreshTokenVerified).toEqual(payload);
  // });
});
