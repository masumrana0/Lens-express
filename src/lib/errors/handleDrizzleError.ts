import { IErrorMessage } from "@src/interface/app.interface/error.interface";
import { DrizzleError } from "drizzle-orm/errors";

function handleDrizzleError(error: DrizzleError): IErrorMessage[] {
  // Default message
  let message = error.message || "Unknown Drizzle ORM error";

  let path = (error as any)?.path || "";

  const cause = (error as any)?.cause;
  if (cause) {
    if (cause.code === "23505") {
      message = "Duplicate value violates unique constraint";
      path = cause.column || path;
    }
  }

  return [
    {
      path,
      message,
    },
  ];
}

export default handleDrizzleError;
