import { BaseRepository } from "@src/lib/core/baseRepository";
import { userTable } from "../user/user.schema";
import {
  DatabaseClientToken,
  type IDatabaseClient,
} from "@src/interface/app.interface/databaseclient.interface";
import { inject, injectable } from "tsyringe";
import { eq } from "drizzle-orm";
import auth from "@src/lib/auth";
import { DecodedUser } from "@src/interface/express_d";
import {
  ILoginData,
  IAuthRepository,
  ILoginResponse,
} from "@src/interface/module.interface/auth.interface";
import { ApiErrors } from "@src/lib/errors/apiError";

@injectable()
export class AuthRepository
  extends BaseRepository<typeof userTable>
  implements IAuthRepository
{
  constructor(@inject(DatabaseClientToken) db: IDatabaseClient) {
    super(db, userTable);
  }

  async login(data: ILoginData): Promise<ILoginResponse> {
    const isExistingUser = (await this.findOne(
      eq(userTable.email, data.email),
    )) as (typeof userTable)["$inferSelect"];

    if (!isExistingUser) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = auth.verifyPassword(
      data.password,
      isExistingUser.password,
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const payload: DecodedUser = {
      id: isExistingUser.id,
      role: isExistingUser?.role as string,
    } as DecodedUser;

    const accessToken = auth.generateToken(payload);
    const refreshToken = auth.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  async refreshToken(user: DecodedUser): Promise<ILoginResponse> {
    const isExistingUser = (await this.findOne(
      eq(userTable.id, user.id),
    )) as (typeof userTable)["$inferSelect"];

    if (!isExistingUser) {
      throw ApiErrors.Unauthorized("User not found");
    }

    const payload: DecodedUser = {
      id: isExistingUser.id,
      role: isExistingUser?.role as string,
    } as DecodedUser;

    const accessToken = auth.generateToken(payload);

    return { accessToken };
  }

  async logout(user: DecodedUser): Promise<void> {}
}
