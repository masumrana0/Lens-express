import "express";

import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user?: DecodedUser;
  }
}

interface DecodedUser {
  id: string;
  email: string;
  role: string;
  name: string;
}
