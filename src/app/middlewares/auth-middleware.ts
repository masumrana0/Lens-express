import { ACCESS_TOKEN, REFRESH_TOKEN } from "@src/constants";
import auth from "@src/lib/auth";
import { ApiErrors } from "@src/lib/errors/apiError";
import { NextFunction, Request, Response } from "express";

class AuthMiddleware {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.accessToken;
    // const refreshToken = req.cookies?.refreshToken;
    if (!token) {
      throw ApiErrors.Unauthorized("Access token is missing");
    }

    const verifiedUser = auth.verifyToken(token);
    if (!verifiedUser) {
      auth.clearCookie(ACCESS_TOKEN, res);
      throw ApiErrors.Unauthorized("Invalid access token");
    }

    req.user = verifiedUser;
    next();
  }

  static async requiredSuperAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.cookies?.accessToken;
    if (!token) {
      throw ApiErrors.Unauthorized("Access token is missing");
    }
    const verifiedUser = auth.verifyToken(token);
    if (!verifiedUser) {
      auth.clearCookie(ACCESS_TOKEN, res);
      throw ApiErrors.Unauthorized("Invalid access token");
    }
    req.user = verifiedUser;

    if (!verifiedUser || verifiedUser.role !== "super_admin") {
      throw ApiErrors.Forbidden("Access denied");
    }
    next();
  }
}

export default AuthMiddleware;
