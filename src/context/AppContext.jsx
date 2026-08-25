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

  async function login(employeeId, password) {
    const data = await request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ employeeId, password }),
    });

    localStorage.setItem("authToken", data.token);
    setUser(data.user);
  }
  async function register(fullName, email, employeeId, password) {
    const data = await request("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ fullName, email, employeeId, password }),
    });

    localStorage.setItem("authToken", data.token);
    setUser(data.user);
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

const VITE_API_URL = import.meta.env.VITE_API_URL;

async function request(path, options) {
  const response = await fetch(`${VITE_API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

async function handleSubmit(e) {
  e.preventDefault();

  const nextErrors = validate();

  if (Object.keys(nextErrors).length > 0) {
    setErrors(nextErrors);
    return;
  }

  try {
    await register(
      form.fullName.trim(),
      form.email.trim(),
      form.employeeId.trim(),
      form.password
    );

    navigate("/report");
  } catch (error) {
    setErrors({ server: error.message });
  }
}
