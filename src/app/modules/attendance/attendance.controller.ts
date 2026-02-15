import { injectable } from "tsyringe";
import AttendanceService from "./attendance.service";
import Controller from "@src/lib/decorators/controller.decorator";
import Use from "@src/lib/decorators/middleware.decorator";
import AuthMiddleware from "@src/app/middlewares/auth-middleware";
import sendResponse from "@src/lib/utils/sendResponse";
import { attendanceTable } from "./attendance.schema";
import { Get, Post } from "@src/lib/decorators/router.decorator";
import type { Request, Response } from "express";
import status from "http-status";

@injectable()
@Controller("/attendance")
// @Use(AuthMiddleware.authenticate)
class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post("/record")
  async recordAttendance(req: Request, res: Response) {
    const result = await this.service.create(req.body);

    return sendResponse<(typeof attendanceTable)["$inferInsert"]>(res, {
      statusCode: status.CREATED,
      message: "Attendance recorded successfully",
      data: result,
    });
  }

  @Get("/")
  async getAllAttendance(req: Request, res: Response) {
    const result = await this.service.findAll();
    return sendResponse<(typeof attendanceTable)["$inferSelect"][]>(res, {
      statusCode: status.OK,
      message: "Attendance records retrieved successfully",
      data: result,
    });
  }
}

export default AttendanceController;
