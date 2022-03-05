export const getError = (error: any): string => {
    if (typeof error === "string") {
      return error;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "An error has occured!";
  };