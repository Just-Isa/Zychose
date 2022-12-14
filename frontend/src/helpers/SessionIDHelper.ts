export function getSessionIDFromCookie(): string {
  return document.cookie.split("=")[1];
}

export function checkIfSessionIDCookieExists(): boolean {
  return (
    document.cookie.split("=")[0] != "" &&
    document.cookie.split("=")[0] != undefined
  );
}

/**Function to delete a cookie by settings its expiry date to 1970
 *
 * @param name Name of cookie -> REQUIRED
 * @param path Path of cookie -> Not required
 * @param domain Domain of cookie -> Not required
 */
export function deleteSessionId(path?: string, domain?: string) {
  if (getCookie("sid")) {
    document.cookie =
      "sid" +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function getCookie(name: string) {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
}
