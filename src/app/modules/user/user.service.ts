import { BaseService } from "@src/lib/core/baseService";
import { injectable } from "tsyringe";
import { userTable } from "./user.schema";
import { BaseRepository } from "@src/lib/core/baseRepository";

@injectable()
export class UserService extends BaseService<
  typeof userTable,
  BaseRepository<typeof userTable>
> {
  constructor(repository: BaseRepository<typeof userTable>) {
    super(repository);
  }
}
