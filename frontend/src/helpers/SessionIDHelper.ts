export function getSessionIDFromCookie(): string {
  return document.cookie.split("=")[1];
}
