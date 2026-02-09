import Controller from "@src/lib/decorators/controller.decorator";
import type { Request, Response } from "express";

import { injectable } from "tsyringe";
import { UserService } from "./user.service";
import { Get, Post } from "@src/lib/decorators/router.decorator";

@injectable()
@Controller("/user")
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post("/create")
  async createUser(req: Request, res: Response) {

    const result = await this.service.create(req.body);
    console.log("User created:", result);
    res.status(201).send(result);
  }
}
