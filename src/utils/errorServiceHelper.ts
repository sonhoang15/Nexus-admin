export const throwServiceError = (error: unknown): never => {
  if (typeof error === "object" && error !== null) {
    const err = error as any;

    const message =
      err?.response?.data?.message || err?.message || "Something went wrong";

    throw new Error(message);
  }

  throw new Error("Unexpected error");
};
