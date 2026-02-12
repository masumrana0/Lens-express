import { BaseService } from "@src/lib/core/baseService";
import { userTable } from "../user/user.schema";
import { AuthRepository } from "./auth.repository";
import { injectable } from "tsyringe";
import {
  ILoginData,
  ILoginResponse,
} from "@src/interface/module.interface/auth.interface";
import { DecodedUser } from "@src/interface/express_d";

@injectable()
export class AuthService extends BaseService<typeof userTable, AuthRepository> {
  constructor(Repository: AuthRepository) {
    super(Repository);
  }
  async login(data: ILoginData): Promise<ILoginResponse> {
    return this.repository.login(data);
  }

  async logout(user: DecodedUser): Promise<void> {
    return this.repository.logout(user);
  }
}
