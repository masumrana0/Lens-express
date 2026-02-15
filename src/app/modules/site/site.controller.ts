import { injectable } from "tsyringe";
import SiteService from "./site.service";
import Use from "@src/lib/decorators/middleware.decorator";
import AuthMiddleware from "@src/app/middlewares/auth-middleware";
import sendResponse from "@src/lib/utils/sendResponse";
import { sitesTable } from "./site.schema";
import status from "http-status";
import { Get, Post } from "@src/lib/decorators/router.decorator";
import type { Request, Response } from "express";
import Controller from "@src/lib/decorators/controller.decorator";

@injectable()
// Use(AuthMiddleware.authenticate)
@Controller("/site")
class SiteController {
  constructor(private readonly service: SiteService) {}

  @Post("/create")
  //   @Use(AuthMiddleware.requiredSuperAdmin)
  async createSite(req: Request, res: Response) {
    const result = await this.service.create(req.body);
    return sendResponse<(typeof sitesTable)["$inferInsert"]>(res, {
      statusCode: status.CREATED,
      message: "Site created successfully",
      data: result,
    });
  }

  @Get("/")
  async getAllSites(req: Request, res: Response) {
    const result = await this.service.findAll();
    return sendResponse<(typeof sitesTable)["$inferSelect"][]>(res, {
      statusCode: status.OK,
      message: "Sites retrieved successfully",
      data: result,
    });
  }

  
}

export default SiteController;
