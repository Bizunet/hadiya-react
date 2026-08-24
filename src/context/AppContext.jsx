import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });
  // Mock authentication — no real backend. Resets on page reload by design (demo only).
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function t(en, am) {
    return lang === "am" ? am : en;
  }

  function login(name, id) {
    setUser({ name, id });
  }
  function register(name, id) {
    setUser({ name, id });
  }
  function logout() {
    setUser(null);
  }

  const value = {
    lang, setLang, t,
    theme, setTheme,
    user, login, register, logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
