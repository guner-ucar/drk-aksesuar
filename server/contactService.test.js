import assert from "node:assert/strict";
import test from "node:test";
import { ContactRequestError, parseContactRequest, submitContactRequest } from "./contactService.js";

const validPayload = {
  name: "Test User",
  company: "Test Brand",
  email: "test@example.com",
  phone: "+90 555 000 00 00",
  country: "Türkiye",
  employees: "51–200",
  area: "E-Commerce",
  goal: "Grow marketplace sales",
  website: "",
  lang: "en",
};

const mailEnvironment = {
  MAIL_HOST: "smtp.example.com",
  MAIL_PORT: "587",
  MAIL_USERNAME: "mailer@example.com",
  MAIL_PASSWORD: "test-password",
  MAIL_ENCRYPTION: "tls",
  MAIL_FROM_ADDRESS: "mailer@example.com",
  MAIL_FROM_NAME: "DRK Test",
  CONTACT_RECIPIENTS: "team@example.com",
};

test("contact payload requires country and employee capacity", () => {
  assert.throws(
    () => parseContactRequest({ ...validPayload, country: "" }),
    (error) => error instanceof ContactRequestError && error.statusCode === 400,
  );
  assert.throws(
    () => parseContactRequest({ ...validPayload, employees: "" }),
    (error) => error instanceof ContactRequestError && error.statusCode === 400,
  );
});

test("contact request sends an internal message and applicant confirmation", async () => {
  const messages = [];
  let transportOptions;
  const transportFactory = (options) => {
    transportOptions = options;
    return { sendMail: async (message) => messages.push(message) };
  };

  const result = await submitContactRequest(validPayload, {
    environment: mailEnvironment,
    transportFactory,
  });

  assert.deepEqual(result, { accepted: true, ignored: false });
  assert.equal(transportOptions.requireTLS, true);
  assert.equal(messages.length, 2);
  assert.equal(messages[0].to[0], "team@example.com");
  assert.equal(messages[1].to, validPayload.email);
  assert.match(messages[0].text, /Ülke: Türkiye/);
  assert.match(messages[0].text, /Çalışan kapasitesi: 51–200/);
});

test("contact request can disable the applicant confirmation", async () => {
  const messages = [];
  const result = await submitContactRequest(validPayload, {
    environment: { ...mailEnvironment, SEND_APPLICANT_CONFIRMATION: "false" },
    transportFactory: () => ({ sendMail: async (message) => messages.push(message) }),
  });

  assert.deepEqual(result, { accepted: true, ignored: false });
  assert.equal(messages.length, 1);
  assert.equal(messages[0].to[0], "team@example.com");
});

test("honeypot submissions are accepted without sending mail", async () => {
  const result = await submitContactRequest(
    { ...validPayload, website: "https://spam.example" },
    { environment: {}, transportFactory: () => assert.fail("Transport should not be created") },
  );

  assert.deepEqual(result, { accepted: true, ignored: true });
});
