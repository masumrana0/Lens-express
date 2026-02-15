import { injectable } from "tsyringe";
import { AuthService } from "./auth.service";
import { type ILoginData } from "@src/interface/module.interface/auth.interface";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@src/constants";
import auth from "@src/lib/auth";
import sendResponse from "@src/lib/utils/sendResponse";
import type { Request, Response } from "express";
import { Post } from "@src/lib/decorators/router.decorator";
import Controller from "@src/lib/decorators/controller.decorator";
import Use from "@src/lib/decorators/middleware.decorator";
import AuthMiddleware from "@src/app/middlewares/auth-middleware";

@injectable()
@Controller("/auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post("/login")
  async login(req: Request, res: Response) {
    const body = req.body as unknown as ILoginData;
    const result = await this.service.login(body);

    const { accessToken, refreshToken } = result;
    auth.setCookie(accessToken, ACCESS_TOKEN, res);
    auth.setCookie(refreshToken, REFRESH_TOKEN, res);

    return sendResponse(res, {
      statusCode: 200,
      message: "Login successful",
      data: null,
    });
  }

  @Use(AuthMiddleware.authenticate)
  @Post("/logout")
  async logout(req: Request, res: Response) {
    auth.clearCookie(ACCESS_TOKEN, res);
    auth.clearCookie(REFRESH_TOKEN, res);
    return sendResponse(res, {
      statusCode: 200,
      message: "Logout successful",
      data: null,
    });
  }
}
