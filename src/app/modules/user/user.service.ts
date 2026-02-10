import { BaseService } from "@src/lib/core/baseService";
import { injectable } from "tsyringe";
import { userTable } from "./user.schema";
import { UserRepository } from "./user.repository";
import { eq } from "drizzle-orm";
import { ApiErrors } from "@src/lib/errors/apiError";
import auth from "@src/lib/auth";

@injectable()
export class UserService extends BaseService<typeof userTable, UserRepository> {
  constructor(repository: UserRepository) {
    super(repository);
  }

  override async create(
    data: (typeof userTable)["$inferInsert"],
  ): Promise<(typeof userTable)["$inferSelect"]> {
    const existingUser = await this.repository.findOne(
      eq(userTable.email, data.email),
    );

    if (existingUser) {
      throw ApiErrors.BadRequest("A user with this email already exists");
    }

    const { password, ...rest } = data;

    const modifiedData = {
      password: auth.hashPassword(password),
      ...rest,
    };

    return super.create(modifiedData);
  }
}
