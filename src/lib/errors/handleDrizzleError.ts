import { IErrorMessage } from "@src/interface/app.interface/error.interface";

const handleDrizzleError = (error: any): IErrorMessage[] => {
  const errorMessages: IErrorMessage[] = [];

  // Unique constraint
  if (error?.cause?.code === "23505") {
    errorMessages.push({
      path: "",
      message: "Duplicate value. This record already exists.",
    });
  }

  // Foreign key violation
  else if (error?.cause?.code === "23503") {
    errorMessages.push({
      path: "",
      message: "Invalid reference. Related record not found.",
    });
  }

  // Not null violation
  else if (error?.cause?.code === "23502") {
    errorMessages.push({
      path: "",
      message: "Required field is missing.",
    });
  } else {
    errorMessages.push({
      path: "",
      message: "Database operation failed.",
    });
  }

  return errorMessages;
};

export default handleDrizzleError;
