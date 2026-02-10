// import appConfig from "@src/config";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// interface IAuth {
//   hashPassword(password: string): string;
//   verifyPassword(password: string, hash: string): boolean;
//   generateToken(payload: object): string;
//   verifyToken(token: string): object | null;
//   setCookie(token: string): void;
//   clearCookie(): void;
// }

// class Auth implements IAuth {
//   static instance: Auth;
//   constructor() {}
//   static getInstance() {
//     if (!Auth.instance) {
//       return (Auth.instance = new Auth());
//     }
//     return Auth.instance;
//   }

//   //Password Utility
//   hashPassword(password: string): string {
//     const hash = bcrypt.hashSync(password, appConfig.security.saltRounds);
//     return hash;
//   }

//   verifyPassword(password: string, hash: string): boolean {
//     return bcrypt.compareSync(password, hash);
//   }

//   //JWT Utility
//   generateToken(payload: object): string {
//     return jwt.sign(payload, appConfig.security.jwtSecret, {
//       expiresIn: appConfig.security.jwtExpiresIn,
//     });
//   }

//   verifyToken(token: string): object | null {
//     return jwt.verify(token, appConfig.security.jwtSecret) as object;
//   }

//   //Cookie Utility
//   setCookie(token: string, key: string, req: Request, res: Response): void {
//     res.cookie(key, token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });
//   }
// }
