import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  _id: null,
  name: "",
  lang: "DE",
  token: null,
  login: () => {},
  logout: () => {}
});
