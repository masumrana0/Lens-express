import Controller from "@src/lib/decorators/controller.decorator";
import Use from "@src/lib/decorators/middleware.decorator";
import { Get, Patch, Post } from "@src/lib/decorators/router.decorator";
import { injectable } from "tsyringe";
import type { Request, Response } from "express";
import sendResponse from "@src/lib/utils/sendResponse";

// @Use((req, res, next) => {
//   console.log(`controller level middleware has been executed `);
//   next();
// })
@injectable()
@Controller("/books")
@Use((req, res, next) => {
  console.log(`the class level middleware has been executed`);
  next();
})
export class BookController {
  constructor() {
    // console.log("BookController instance created");
  }
  @Use((req, res, next) => {
    console.log(`the method level middleware has been executed`);
    next();
  })
  @Get("/test", [
    (req, res, next) => {
      console.log(`the route level middleware has been executed`);
      next();
    },
  ])
  testMethod(req: Request, res: Response) {
    // throw new Error("Test error from BookController testMethod");
    res.send(
      "Hello from BookController testMethod.................Hello that's me",
    );
  }

  @Post("/test-post")
  testPostMethod(req: Request, res: Response) {
    const data = req.body;

    sendResponse<any>(res, {
      statusCode: 201,
      message: "Data received successfully",
      data: data,
    });
  }

  @Patch("/update")
  updateMethod(req: Request, res: Response) {
    res.send("Hello from BookController updateMethod");
  }
}
