// import "reflect-metadata";
// import Controller from "@src/lib/decorators/controller.decorator";
// import { container, inject, injectable } from "tsyringe";
// import { UserService } from "./user.service";
// import { Post } from "@src/lib/decorators/router.decorator";
// import type { Request, Response } from "express";
// @injectable()
// @Controller("/user")
// export class UserController {
//   service = container.resolve(UserService);
//   constructor() {
//     // console.log("UserController initialized", userService);
//   }

//   @Post("/create")
//   async createUser(req: Request, res: Response) {
//     // const result = await this.userService.create(req.body);
//     // console.log("User created:", result);
//     console.log("body", req.body);
//     console.log("UserController context:", this.service);
//     // res.status(201).send(result);
//   }
// }

import Controller from "@src/lib/decorators/controller.decorator";
import type { Request, Response } from "express";

import { injectable } from "tsyringe";
import { UserService } from "./user.service";
import { Get, Post } from "@src/lib/decorators/router.decorator";

@injectable()
@Controller("/users")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post("/create")
  async createUser(req: Request, res: Response) {
    console.log("body", req.body);
    console.log("UserController context:", this.service);
  }
}
