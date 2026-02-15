import { BaseRepository } from "@src/lib/core/baseRepository";
import { sitesTable } from "./site.schema";
import {
  DatabaseClientToken,
  type IDatabaseClient,
} from "@src/interface/app.interface/databaseclient.interface";
import { inject, injectable } from "tsyringe";

@injectable()
class SiteRepository extends BaseRepository<typeof sitesTable> {
  constructor(@inject(DatabaseClientToken) db: IDatabaseClient) {
    super(db, sitesTable);
  }
}

export default SiteRepository;
