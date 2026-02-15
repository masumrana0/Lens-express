import { injectable } from "tsyringe";
import EmployeeService from "./employee.service";
import Controller from "@src/lib/decorators/controller.decorator";
import AuthMiddleware from "@src/app/middlewares/auth-middleware";
import Use from "@src/lib/decorators/middleware.decorator";
import { Get, Post } from "@src/lib/decorators/router.decorator";
import type { Request, Response } from "express";
import status from "http-status";
import sendResponse from "@src/lib/utils/sendResponse";
import { employeeTable } from "./employee.schema";

@injectable()
@Controller("/employee")
// @Use(AuthMiddleware.authenticate)
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Post("/create")
  async createEmployee(req: Request, res: Response) {
    console.log("body", req.body);
    const result = await this.service.create(req.body);
    return sendResponse<(typeof employeeTable)["$inferInsert"]>(res, {
      statusCode: status.CREATED,
      message: "Employee created successfully",
      data: result,
    });
  }

  @Get("/")
  async getAllEmployees(req: Request, res: Response) {
    const result = await this.service.findAll();
    return sendResponse<(typeof employeeTable)["$inferSelect"][]>(res, {
      statusCode: status.OK,
      message: "Employees retrieved successfully",
      data: result,
    });
  }
}
