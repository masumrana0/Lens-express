import { injectable } from "tsyringe";
import { userTable } from "./user.schema";
import { BaseRepository } from "@src/lib/core/baseRepository";
import type { IDatabaseClient } from "@src/interface/app.interface/databaseclient.interface";

@injectable()
export class UserRepository extends BaseRepository<typeof userTable> {
  constructor(@inject() db: IDatabaseClient) {
    super(db, userTable);
  }
}
