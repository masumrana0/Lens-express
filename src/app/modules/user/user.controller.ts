import Controller from "@src/lib/decorators/controller.decorator";
import type { Request, Response } from "express";
import { injectable } from "tsyringe";
import { UserService } from "./user.service";
import { Get, Post } from "@src/lib/decorators/router.decorator";
import sendResponse from "@src/lib/utils/sendResponse";
import { userTable } from "./user.schema";
import status from "http-status";
import Use from "@src/lib/decorators/middleware.decorator";
import AuthMiddleware from "@src/app/middlewares/auth-middleware";

@injectable()
// @Use(AuthMiddleware.authenticate)
@Controller("/user")
export class UserController {
  constructor(private readonly service: UserService) {}

  // @Use(AuthMiddleware.requiredSuperAdmin)
  @Post("/create")
  async createUser(req: Request, res: Response) {
    const result = await this.service.create(req.body);

    return sendResponse<(typeof userTable)["$inferInsert"]>(res, {
      statusCode: status.CREATED,
      message: "User created successfully",
      data: result,
    });
  }

  @Get("/")
  async getAllUsers(req: Request, res: Response) {
    const users = await this.service.findAll();
    return sendResponse<(typeof userTable)["$inferSelect"][]>(res, {
      statusCode: status.OK,
      message: "users retrieved successfully",
      data: users,
    });
  }
}
