import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const adminSessionCookieName = "admin_session";
export const adminSessionDurationSeconds = 8 * 60 * 60;

function safeEqual(left: string, right: string): boolean {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function getSessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_EMAIL?.trim() &&
      process.env.ADMIN_PASSWORD &&
      getSessionSecret()
  );
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD;

  return Boolean(
    isAdminAuthConfigured() &&
      expectedEmail &&
      expectedPassword &&
      safeEqual(email.trim().toLowerCase(), expectedEmail) &&
      safeEqual(password, expectedPassword)
  );
}

export function createAdminSessionToken(): string {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  }

  const expiresAt = String(Date.now() + adminSessionDurationSeconds * 1000);
  const signature = createHmac("sha256", secret).update(expiresAt).digest("hex");
  return `${expiresAt}.${signature}`;
}

export function hasValidAdminSession(request: Request): boolean {
  const secret = getSessionSecret();
  const cookieHeader = request.headers.get("cookie");
  if (!secret || !cookieHeader) {
    return false;
  }

  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${adminSessionCookieName}=`));
  const token = cookie?.slice(adminSessionCookieName.length + 1);
  const [expiresAt, providedSignature] = token?.split(".") ?? [];

  if (
    !expiresAt ||
    !providedSignature ||
    !/^\d+$/.test(expiresAt) ||
    !/^[a-f0-9]{64}$/.test(providedSignature) ||
    Number(expiresAt) <= Date.now()
  ) {
    return false;
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(expiresAt)
    .digest("hex");
  return safeEqual(providedSignature, expectedSignature);
}