import nodemailer from "nodemailer";

const DEFAULT_RECIPIENTS = [
  "burcu@shargeturkiye.com",
  "guner@samsungwa.com.tr",
  "asgar.imanzade@shargeturkiye.com",
];

const FIELD_LIMITS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 60,
  area: 180,
  goal: 4000,
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readField(body, key, required = false) {
  const value = typeof body[key] === "string" ? body[key].trim() : "";
  if (required && !value) throw new Error(`Missing field: ${key}`);
  if (value.length > FIELD_LIMITS[key]) throw new Error(`Field too long: ${key}`);
  return value;
}

function parseRequest(body) {
  const data = typeof body === "string" ? JSON.parse(body) : (body || {});
  const applicant = {
    name: readField(data, "name", true),
    company: readField(data, "company", true),
    email: readField(data, "email", true).toLowerCase(),
    phone: readField(data, "phone"),
    area: readField(data, "area", true),
    goal: readField(data, "goal", true),
    website: typeof data.website === "string" ? data.website.trim() : "",
    lang: data.lang === "en" ? "en" : "tr",
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicant.email)) throw new Error("Invalid email");
  return applicant;
}

function buildInternalMessage(applicant) {
  const rows = [
    ["Ad Soyad", applicant.name],
    ["Şirket / Marka", applicant.company],
    ["E-posta", applicant.email],
    ["Telefon", applicant.phone || "Belirtilmedi"],
    ["İlgilenilen alan", applicant.area],
    ["Büyüme hedefi", applicant.goal],
  ];
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#64748b;font:600 12px Arial,sans-serif;vertical-align:top;width:150px">${escapeHtml(label)}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#171a34;font:14px/1.6 Arial,sans-serif;white-space:pre-wrap">${escapeHtml(value)}</td>
    </tr>`).join("");
  return {
    subject: `Yeni marka görüşme talebi · ${applicant.company}`,
    text: `DRK Aksesuar web sitesi üzerinden yeni bir görüşme talebi alındı.\n\n${text}`,
    html: `
      <div style="margin:0;padding:32px 16px;background:#f5f3ef">
        <div style="max-width:680px;margin:0 auto;overflow:hidden;border:1px solid #e5e7eb;border-radius:16px;background:#fff">
          <div style="padding:28px 30px;background:#171a34;color:#fff">
            <div style="font:700 12px Arial,sans-serif;letter-spacing:.14em;color:#9ee79a">DRK AKSESUAR</div>
            <h1 style="margin:10px 0 0;font:700 25px/1.2 Arial,sans-serif">Yeni marka görüşme talebi</h1>
          </div>
          <table role="presentation" style="width:100%;border-collapse:collapse">${htmlRows}</table>
        </div>
      </div>`,
  };
}

function buildConfirmationMessage(applicant) {
  const isEnglish = applicant.lang === "en";
  const subject = isEnglish ? "We received your DRK Aksesuar request" : "DRK Aksesuar talebinizi aldık";
  const greeting = isEnglish ? `Hello ${applicant.name},` : `Merhaba ${applicant.name},`;
  const body = isEnglish
    ? "Your meeting request has reached our team. We will review your brand, selected service area and growth objective, then contact you as soon as possible."
    : "Görüşme talebiniz ekibimize ulaştı. Markanızı, seçtiğiniz hizmet alanını ve büyüme hedefinizi inceleyerek en kısa sürede sizinle iletişime geçeceğiz.";
  const note = isEnglish
    ? "This is an automated confirmation; you do not need to reply."
    : "Bu otomatik bir bilgilendirme mesajıdır; yanıtlamanız gerekmez.";
  return {
    subject,
    text: `${greeting}\n\n${body}\n\nDRK Aksesuar\n${note}`,
    html: `
      <div style="margin:0;padding:32px 16px;background:#f5f3ef">
        <div style="max-width:620px;margin:0 auto;padding:34px;border:1px solid #e5e7eb;border-radius:16px;background:#fff;color:#171a34;font:14px/1.7 Arial,sans-serif">
          <div style="font:700 12px Arial,sans-serif;letter-spacing:.14em;color:#08ad00">DRK AKSESUAR</div>
          <h1 style="margin:14px 0 18px;font:700 26px/1.2 Arial,sans-serif">${escapeHtml(subject)}</h1>
          <p style="margin:0 0 12px">${escapeHtml(greeting)}</p>
          <p style="margin:0">${escapeHtml(body)}</p>
          <p style="margin:28px 0 0;color:#64748b;font-size:12px">${escapeHtml(note)}</p>
        </div>
      </div>`,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  let applicant;
  try {
    applicant = parseRequest(req.body);
  } catch {
    return res.status(400).json({ ok: false });
  }

  if (applicant.website) return res.status(200).json({ ok: true });

  const requiredEnvironment = ["MAIL_HOST", "MAIL_PORT", "MAIL_USERNAME", "MAIL_PASSWORD", "MAIL_FROM_ADDRESS"];
  if (requiredEnvironment.some((key) => !process.env[key])) return res.status(503).json({ ok: false });

  const recipients = (process.env.CONTACT_RECIPIENTS || DEFAULT_RECIPIENTS.join(","))
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
  const from = {
    name: process.env.MAIL_FROM_NAME || "DRK Bildirim",
    address: process.env.MAIL_FROM_ADDRESS,
  };
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Number(process.env.MAIL_PORT) === 465,
    requireTLS: String(process.env.MAIL_ENCRYPTION).toLowerCase() === "tls",
    auth: { user: process.env.MAIL_USERNAME, pass: process.env.MAIL_PASSWORD },
    tls: { minVersion: "TLSv1.2" },
  });
  const internal = buildInternalMessage(applicant);
  const confirmation = buildConfirmationMessage(applicant);

  try {
    await Promise.all([
      transporter.sendMail({ from, to: recipients, replyTo: applicant.email, ...internal }),
      transporter.sendMail({ from, to: applicant.email, ...confirmation }),
    ]);
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false });
  }
}
