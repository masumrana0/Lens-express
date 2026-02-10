import { DecodedUser } from "../express_d";

export type IAuthResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ILoginData = {
  email: string;
  password: string;
};

export interface IAuthRepository {
  login(data: ILoginData): Promise<ILoginResponse>;
  logout(user: DecodedUser): Promise<void>;
  refreshToken(user: DecodedUser): Promise<ILoginResponse>;
}
