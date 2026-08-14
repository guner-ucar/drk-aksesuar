import { ContactRequestError, submitContactRequest } from "../server/contactService.js";

function readRequestBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body !== "string") return {};

  try {
    return JSON.parse(request.body);
  } catch {
    throw new ContactRequestError(400, "Invalid JSON body");
  }
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false });
  }

  try {
    await submitContactRequest(readRequestBody(request));
    return response.status(200).json({ ok: true });
  } catch (error) {
    const statusCode = error instanceof ContactRequestError ? error.statusCode : 500;
    console.error("Contact request failed", {
      statusCode,
      error: error?.name || "Error",
      code: error?.cause?.code,
      responseCode: error?.cause?.responseCode,
      command: error?.cause?.command,
    });
    return response.status(statusCode).json({ ok: false });
  }
}
