import { inject, injectable } from "tsyringe";
import { userTable } from "./user.schema";
import { BaseRepository } from "@src/lib/core/baseRepository";
import {
  DatabaseClientToken,
  type IDatabaseClient,
} from "@src/interface/app.interface/databaseclient.interface";

@injectable()
export class UserRepository extends BaseRepository<typeof userTable> {
  constructor(@inject(DatabaseClientToken) db: IDatabaseClient) {
    super(db, userTable);
    console.log("UserRepository initialized");
  }
}
