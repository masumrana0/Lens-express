import { BaseService } from "@src/lib/core/baseService";
import { injectable } from "tsyringe";
import { userTable } from "./user.schema";
import { UserRepository } from "./user.repository";

@injectable()
export class UserService extends BaseService<typeof userTable, UserRepository> {
  constructor(repository: UserRepository) {
    super(repository);
  }
}



 