import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageHero from "../components/PageHero";
import { IconLock, IconCheck, IconEye, IconEyeOff } from "../components/Icons";

export default function Signup() {
  const { t, user, register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    employeeId: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = t("Please enter your full name.", "ሙሉ ስምዎን ያስገቡ።");
    if (!form.email.trim()) nextErrors.email = t("Please enter your email.", "ኢሜልዎን ያስገቡ።");
    if (!form.employeeId.trim()) nextErrors.employeeId = t("Please enter your employee ID.", "የሰራተኛ መለያ ቁጥርዎን ያስገቡ።");
    if (!form.password.trim()) nextErrors.password = t("Please create a password.", "የይለፍ ቃል ይፍጠሩ።");
    else if (form.password.length < 6) nextErrors.password = t("Password must be at least 6 characters long.", "የይለፍ ቃል ቢያንስ 6 ፊደላት መሆን አለበት።");
    if (!form.confirmPassword.trim()) nextErrors.confirmPassword = t("Please confirm your password.", "እባክዎ የይለፍ ቃልዎን ያረጋግጡ።");
    else if (form.password !== form.confirmPassword) nextErrors.confirmPassword = t("Passwords do not match.", "የይለፍ ቃሎች አይመሳሰሉም።");
    return nextErrors;
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
        form.password,
      );
      navigate("/report");
    } catch (requestError) {
      setErrors({ server: requestError.message });
    }
  }

  return (
    <>
      <PageHero
        amLine="መመዝገብ"
        en="Create Account"
        p={t(
          "Register your employee profile to access reporting and service tools.",
          "ለሪፖርት እና አገልግሎት መሳሪያዎች በመጠቀም የሰራተኛ መለያዎን ይመዝገቡ።"
        )}
        crumbs={[{ en: "Sign Up", am: "መመዝገብ" }]}
      />

      <section>
        <div className="wrap signup-shell">
          {user ? (
            <div className="card" style={{ padding: 36, textAlign: "center" }}>
              <div className="stamp" style={{ marginBottom: 18 }}>
                <IconCheck width={34} height={34} />
              </div>
              <h3>{t("You already have an account", "አስቀድሞ መለያ አለዎት")}</h3>
              <p className="sub" style={{ marginTop: 10 }}>{t("Signed in as", "እንደ ገብተዋል")} {user.name}</p>
              <button className="btn btn-deep" onClick={() => navigate("/report")} style={{ marginTop: 12 }}>
                <span>{t("Go to Report Submission", "ወደ ሪፖርት ማስገቢያ ይሂዱ")}</span>
              </button>
            </div>
          ) : (
            <div className="card">
              

              <form onSubmit={handleSubmit}>
                <h3>{t("Create an employee account", "የሰራተኛ መለያ ይፍጠሩ")}</h3>
                <p className="sub">{t("Set up your profile to submit reports securely.", "ሪፖርቶችን በደህና ለማስገባት መለያዎን ያዘጋጁ።")}</p>
                {errors.server && <div className="err-msg" style={{ display: "block" }}>{errors.server}</div>}

                <div className={`field${errors.fullName ? " has-error" : ""}`}>
                  <label>{t("Full Name *", "ሙሉ ስም *")}</label>
                  <input
                    type="text"
                    className={errors.fullName ? "invalid" : ""}
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder={t("e.g. Abebe Kebede", "ለምሳሌ አበበ ከበደ")}
                  />
                  <div className="err-msg" style={{ display: errors.fullName ? "block" : "none" }}>{errors.fullName}</div>
                </div>

                <div className={`field${errors.email ? " has-error" : ""}`}>
                  <label>{t("Work Email *", "የስራ ኢሜል *")}</label>
                  <input
                    type="email"
                    className={errors.email ? "invalid" : ""}
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder={t("name@hadiya.gov.et", "name@hadiya.gov.et")}
                  />
                  <div className="err-msg" style={{ display: errors.email ? "block" : "none" }}>{errors.email}</div>
                </div>

                <div className={`field${errors.employeeId ? " has-error" : ""}`}>
                  <label>{t("Employee ID *", "የሰራተኛ መለያ ቁጥር *")}</label>
                  <input
                    type="text"
                    className={errors.employeeId ? "invalid" : ""}
                    value={form.employeeId}
                    onChange={(e) => updateField("employeeId", e.target.value)}
                    placeholder={t("e.g. HZ-2481", "ለምሳሌ HZ-2481")}
                  />
                  <div className="err-msg" style={{ display: errors.employeeId ? "block" : "none" }}>{errors.employeeId}</div>
                </div>

                <div className={`field${errors.password ? " has-error" : ""}`}>
                  <label>{t("Password *", "የይለፍ ቃል *")}</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={errors.password ? "invalid" : ""}
                      value={form.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      placeholder="••••••••"
                    />
                    <button className="password-toggle" type="button" aria-label={showPassword ? t("Hide password", "የይለፍ ቃል ደብቅ") : t("Show password", "የይለፍ ቃል አሳይ")} onClick={() => setShowPassword((value) => !value)}>
                      {showPassword ? <IconEyeOff width={18} height={18} /> : <IconEye width={18} height={18} />}
                    </button>
                  </div>
                  <div className="err-msg" style={{ display: errors.password ? "block" : "none" }}>{errors.password}</div>
                  <div className="hint">{t("Use any password for the prototype demo.", "ለናሙና ምሳሌ ማንኛውንም የይለፍ ቃል መጠቀም ይችላሉ።")}</div>
                </div>

                <div className={`field${errors.confirmPassword ? " has-error" : ""}`}>
                  <label>{t("Confirm Password *", "የይለፍ ቃል ያረጋግጡ *")}</label>
                  <div className="password-input">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={errors.confirmPassword ? "invalid" : ""}
                      value={form.confirmPassword}
                      onChange={(e) => updateField("confirmPassword", e.target.value)}
                      placeholder="••••••••"
                    />
                    <button className="password-toggle" type="button" aria-label={showConfirmPassword ? t("Hide confirmed password", "የተረጋገጠውን የይለፍ ቃል ደብቅ") : t("Show confirmed password", "የተረጋገጠውን የይለፍ ቃል አሳይ")} onClick={() => setShowConfirmPassword((value) => !value)}>
                      {showConfirmPassword ? <IconEyeOff width={18} height={18} /> : <IconEye width={18} height={18} />}
                    </button>
                  </div>
                  <div className="err-msg" style={{ display: errors.confirmPassword ? "block" : "none" }}>{errors.confirmPassword}</div>
                </div>

                <button type="submit" className="btn btn-deep btn-block">
                  <IconLock width={16} height={16} />
                  <span>{t("Create Account", "መለያ ፍጠር")}</span>
                </button>

                <p className="auth-link-row">
                  {t("Already have an account?", "መለያ አለዎት?")}
                  <Link to="/login">{t("Log in", "ግባ")}</Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
