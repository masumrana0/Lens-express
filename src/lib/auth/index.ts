import appConfig from "@src/config";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import type { Response } from "express";
import { DecodedUser } from "@src/interface/express_d";

interface IAuth {
  hashPassword(password: string): string;
  verifyPassword(password: string, hash: string): boolean;
  generateToken(payload: DecodedUser): string;
  generateRefreshToken(payload: DecodedUser): string;
  verifyToken(token: string): DecodedUser | null;
  setCookie(token: string, key: string, res: Response): void;
  clearCookie(key: string, res: Response): void;
}

class Auth implements IAuth {
  static instance: Auth;
  constructor() {}
  static getInstance() {
    if (!Auth.instance) {
      return (Auth.instance = new Auth());
    }
    return Auth.instance;
  }

  //Password Utility
  hashPassword(password: string): string {
    const hash = bcrypt.hashSync(password, appConfig.security.saltRounds);
    return hash;
  }

  verifyPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  //JWT Utility
  generateToken(payload: DecodedUser): string {
    const secret: jwt.Secret = appConfig.security.jwtSecret;
    const expiresIn: string | number = appConfig.security.jwtExpiresIn;

    if (!secret) throw new Error("JWT secret is missing");
    if (!expiresIn) throw new Error("JWT expiresIn is missing");

    // Force TS to understand exact type
    const options: SignOptions = { expiresIn } as SignOptions;

    return jwt.sign(payload, secret, options);
  }

  generateRefreshToken(payload: DecodedUser): string {
    const secret: jwt.Secret = appConfig.security.jwtRefreshSecret;
    const expiresIn: string | number = appConfig.security.jwtRefreshExpiresIn;

    if (!secret) throw new Error("JWT refresh secret is missing");
    if (!expiresIn) throw new Error("JWT refresh expiresIn is missing");

    // Force TS to understand exact type
    const options: SignOptions = { expiresIn } as SignOptions;

    return jwt.sign(payload, secret, options);
  }

  verifyToken(token: string): DecodedUser | null {
    return jwt.verify(
      token,
      appConfig.security.jwtSecret as jwt.Secret,
    ) as DecodedUser;
  }

  //Cookie Utility
  setCookie(token: string, key: string, res: Response): void {
    res.cookie(key, token, {
      httpOnly: true,
      secure: appConfig.AppEnvironment === "production",
      sameSite: "strict",
    });
  }

  clearCookie(key: string, res: Response): void {
    res.clearCookie(key, {
      httpOnly: true,
      secure: appConfig.AppEnvironment === "production",
      sameSite: "strict",
    });
  }
}

const auth = Auth.getInstance();

export default auth;
