import Controller from "@src/lib/decorators/controller.decorator";
import { injectable } from "tsyringe";
import { UserService } from "./user.service";
import { Post } from "@src/lib/decorators/router.decorator";
import type { Request, Response } from "express";

@Controller("/user")
@injectable()
export class UserController {
  constructor(private service: UserService) {}
  @Post("/create")
  async createUser(req: Request, res: Response) {
    // const result = await this.service.create(req.body);
    // res.send(result);
  }
}
