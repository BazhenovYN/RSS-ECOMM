export function setCookie(name: string, value: string, expires: number): void {
  const expiresDate = new Date(expires);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expiresDate.toUTCString()}; path=/`;
}

export function getCookie(name: string): string | null {
  const cookieArray = document.cookie.split(';');
  for (let i = 0; i < cookieArray.length; i += 1) {
    const cookie = cookieArray[i].trim();
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

export function deleteCookie(name: string) {
  const expires = new Date();
  expires.setDate(expires.getDate() - 1);
  document.cookie = `${name}=; expires=${expires.toUTCString()}; path=/`;
}
