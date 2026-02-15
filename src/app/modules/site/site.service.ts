import { BaseService } from "@src/lib/core/baseService";
import SiteRepository from "./site.repository";
import { sitesTable } from "./site.schema";
import { injectable } from "tsyringe";

@injectable()
class SiteService extends BaseService<typeof sitesTable, SiteRepository> {
  constructor(readonly repository: SiteRepository) {
    super(repository);
  }
}

export default SiteService;
