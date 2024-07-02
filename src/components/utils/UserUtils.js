import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export function isAuthenticated() {
  const token = Cookies.get("token");

  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);

  return decoded;
}
