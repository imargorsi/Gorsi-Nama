import { isClerkAPIResponseError, isClerkRuntimeError } from "@clerk/nextjs/errors";

export function getErrorMessage(error: unknown, fallback: string): string {
  if (isClerkAPIResponseError(error)) {
    return error.errors[0]?.longMessage ?? error.errors[0]?.message ?? fallback;
  }
  if (isClerkRuntimeError(error)) {
    return error.message || fallback;
  }
  if (error instanceof Error) {
    const longMessage = "longMessage" in error ? error.longMessage : undefined;
    if (typeof longMessage === "string") return longMessage;
    if (error.message) return error.message;
  }
  return fallback;
}
