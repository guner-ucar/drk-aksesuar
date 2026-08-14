import assert from "node:assert/strict";
import test from "node:test";
import handler from "./contact.js";

function createResponse() {
  return {
    body: undefined,
    headers: {},
    statusCode: 200,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test("Vercel contact function rejects unsupported methods", async () => {
  const response = createResponse();
  await handler({ method: "GET" }, response);

  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.Allow, "POST");
  assert.deepEqual(response.body, { ok: false });
});

test("Vercel contact function rejects malformed JSON", async () => {
  const response = createResponse();
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    await handler({ method: "POST", body: "{" }, response);
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, { ok: false });
});
