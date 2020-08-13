import client from "../graphql/client";

const MATCHSTIK_AUTH_TOKEN = "MATCHSTIK_AUTH_TOKEN";

export function setToken(token: string) {
  return localStorage.setItem(MATCHSTIK_AUTH_TOKEN, token);
}

export function getToken(): string | null {
  return localStorage.getItem(MATCHSTIK_AUTH_TOKEN);
}

export async function logout() {
  localStorage.clear();
  // persistor.pause();
  // persistor.purge();
  client.resetStore();
  window.location.href = '/';
}
