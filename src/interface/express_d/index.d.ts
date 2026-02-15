import "express";

import "express-serve-static-core";
import { IRole } from "../module.interface/auth.interface";

declare module "express-serve-static-core" {
  interface Request {
    user?: DecodedUser;
  }
}

interface DecodedUser {
  id: string;
  email: string;
  role: IRole;
  name: string;
}
