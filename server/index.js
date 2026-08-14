import "dotenv/config";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { ContactRequestError, submitContactRequest } from "./contactService.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(currentDirectory, "..");
const distributionDirectory = path.join(projectDirectory, "dist");
const indexFile = path.join(distributionDirectory, "index.html");
const port = Number(process.env.PORT || 3000);

if (!existsSync(indexFile)) {
  throw new Error("Production files are missing. Run `npm run build` before starting the server.");
}

const app = express();
app.disable("x-powered-by");
app.use((request, response, next) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("X-Frame-Options", "SAMEORIGIN");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});
app.use(express.json({ limit: "24kb" }));

app.post("/api/contact", async (request, response) => {
  try {
    await submitContactRequest(request.body);
    response.status(200).json({ ok: true });
  } catch (error) {
    const statusCode = error instanceof ContactRequestError ? error.statusCode : 500;
    response.status(statusCode).json({ ok: false });
  }
});

app.use("/api", (_request, response) => {
  response.status(404).json({ ok: false });
});

app.use(express.static(distributionDirectory, {
  index: false,
  setHeaders(response, filePath) {
    if (filePath.includes(`${path.sep}assets${path.sep}`)) {
      response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else if (/\.(?:png|jpe?g|webp|avif|svg|woff2?)$/i.test(filePath)) {
      response.setHeader("Cache-Control", "public, max-age=604800");
    }
  },
}));

app.use((request, response, next) => {
  if (request.method !== "GET" || !request.accepts("html")) return next();
  return response.sendFile(indexFile);
});

app.use((_request, response) => {
  response.status(404).json({ ok: false });
});

app.use((error, _request, response, _next) => {
  const statusCode = error instanceof SyntaxError ? 400 : 500;
  response.status(statusCode).json({ ok: false });
});

app.listen(port, () => {
  console.log(`DRK Aksesuar is running on port ${port}.`);
});
