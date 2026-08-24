import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageHero from "../components/PageHero";
import { IconLock, IconInfo } from "../components/Icons";

export default function Login() {
  const { t, user, login } = useApp();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!id.trim() || !password.trim()) {
      setError(true);
      return;
    }

    try {
      await login(id.trim(), password);
      navigate("/report");
    } catch (requestError) {
      setServerError(requestError.message);
    }
  }

  return (
    <>
      <PageHero
        amLine="ግባ"
        en="Employee Login"
        p={t("Sign in with your employee details to submit a work report.", "የስራ ሪፖርት ለማስገባት በሰራተኛ መረጃዎ ይግቡ።")}
        crumbs={[{ en: "Log In", am: "ግባ" }]}
      />

      <section>
        <div className="wrap login-shell">
          {user ? (
            <div className="card" style={{ padding: 36, textAlign: "center" }}>
              <h3>{t("You're already signed in", "ቀድሞውኑ ገብተዋል")}</h3>
              <p className="sub">{t("Signed in as", "እንደ ገብተዋል")} {user.name}</p>
              <button className="btn btn-deep" onClick={() => navigate("/report")}>
                <span>{t("Go to Report Submission", "ወደ ሪፖርት ማስገቢያ ይሂዱ")}</span>
              </button>
            </div>
          ) : (
            <div className="card">
              <div className="notice" style={{ marginBottom: 24 }}>
                <IconInfo width={19} height={19} />
                <span>{t(
                  "This is a demo login for the prototype — it does not check a real password yet. Connect a backend (e.g. Supabase Auth) to enable real employee sign-in.",
                  "ይህ ለናሙናው የተዘጋጀ መግቢያ ነው — እውነተኛ የይለፍ ቃል ገና አያረጋግጥም። እውነተኛ የሰራተኛ መግቢያ ለማንቃት ባክኤንድ (ለምሳሌ Supabase Auth) ማስተሳሰር ያስፈልጋል።"
                )}</span>
              </div>

              <form onSubmit={handleSubmit}>
                <h3>{t("Employee Sign In", "የሰራተኛ መግቢያ")}</h3>
                <p className="sub">{t("Enter your employee ID and password to continue.", "ለመቀጠል የሰራተኛ መለያ ቁጥርዎንና የይለፍ ቃልዎን ያስገቡ።")}</p>
                {serverError && <div className="err-msg" style={{ display: "block" }}>{serverError}</div>}

                <div className={`field${error && !id.trim() ? " has-error" : ""}`}>
                  <label>{t("Employee ID *", "የሰራተኛ መለያ ቁጥር *")}</label>
                  <input type="text" className={error && !id.trim() ? "invalid" : ""} value={id} onChange={(e) => setId(e.target.value)} placeholder={t("e.g. HZ-2481", "ለምሳሌ HZ-2481")} />
                  <div className="err-msg" style={{ display: error && !id.trim() ? "block" : "none" }}>{t("Please enter your employee ID.", "እባክዎ የሰራተኛ መለያ ቁጥርዎን ያስገቡ።")}</div>
                </div>

                <div className="field">
                  <label>{t("Password *", "የይለፍ ቃል *")}</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                </div>

                <button type="submit" className="btn btn-deep btn-block">
                  <IconLock width={16} height={16} />
                  <span>{t("Log In", "ግባ")}</span>
                </button>

                <p className="auth-link-row">
                  {t("Need an account?", "መለያ ያስፈልገዋል?")}
                  <Link to="/signup">{t("Create one", "ፈጥር")}</Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
