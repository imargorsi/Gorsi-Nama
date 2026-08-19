export class HttpError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function readRequestJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new HttpError(400, "Invalid JSON");
  }
}

export async function handleRoute(
  fn: () => Promise<Response>,
  fallback = "Could not complete that request."
) {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof HttpError) {
      return jsonError(error.message, error.status);
    }
    console.error(error);
    return jsonError(fallback, 500);
  }
}
