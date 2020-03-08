import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export function useAuth() {
  const [token, setToken] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [_id, setUserId] = useState();
  const [name, setName] = useState();

  const login = useCallback((uid, token, name, oldExpirationDate) => {
    setToken(token);
    setName(name);
    setUserId(uid);
    const tokenExpirationDate =
      oldExpirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        _id: uid,
        name: name,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, remainingTime);
    } else clearTimeout(logoutTimer);
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    )
      login(
        storedData._id,
        storedData.token,
        storedData.name,
        new Date(storedData.expiration)
      );
  }, [login]);

  return { token, login, logout, _id, name };
}
