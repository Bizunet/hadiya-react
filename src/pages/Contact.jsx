import { useState } from "react";
import { useApp } from "../context/AppContext";
import PageHero from "../components/PageHero";
import { IconPin, IconPhone, IconMail, IconClock, IconCheck } from "../components/Icons";

export default function Contact() {
  const { t } = useApp();
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

const VITE_API_URL = import.meta.env.VITE_API_URL;

  function setField(key, val) {
    setFields((f) => ({ ...f, [key]: val }));
  }

  function validate() {
    const errs = {};
    if (!fields.name.trim()) errs.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errs.email = true;
    if (!fields.subject) errs.subject = true;
    if (!fields.message.trim()) errs.message = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setServerError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message");
      }

      setSuccess(data.reference);
    } catch (requestError) {
      setServerError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setFields({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setSuccess(null);
    setServerError("");
  }

  return (
    <>
      <PageHero
        amLine="አግኙን"
        en="Contact Us"
        p={t(
          "Questions about the Department, a service, or this portal? Reach out through any of the channels below.",
          "ስለ መምሪያው፣ ስለ አገልግሎት ወይም ስለዚህ ፖርታል ጥያቄ አለዎት? ከዚህ በታች ባሉት መንገዶች ያግኙን።"
        )}
        crumbs={[{ en: "Contact", am: "አግኙን" }]}
      />

      <section>
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <span className="ic"><IconPin width={20} height={20} /></span>
                  <div>
                    <h4>{t("Office Address", "የጽ/ቤት አድራሻ")}</h4>
                    <p>{t(
                      "Hadiya Zone Public Service & HR Development Department, Hosaena, Central Ethiopia Regional State, Ethiopia",
                      "የሀድያ ዞን ፐብሊክ ሰርቪስና የሰዉ ኃብት ልማት መምሪያ፣ ሆሳዕና፣ ማዕከላዊ ኢትዮጵያ ክልላዊ መንግስት፣ ኢትዮጵያ"
                    )}</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="ic"><IconPhone width={20} height={20} /></span>
                  <div><h4>{t("Phone", "ስልክ")}</h4><p>+251 46 XXX XXXX</p></div>
                </div>
                <div className="contact-info-item">
                  <span className="ic"><IconMail width={20} height={20} /></span>
                  <div><h4>{t("Email", "ኢሜይል")}</h4><p>hzpsd.hr@ethiopia.gov.et</p></div>
                </div>
                <div className="contact-info-item">
                  <span className="ic"><IconClock width={20} height={20} /></span>
                  <div><h4>{t("Office Hours", "የስራ ሰዓት")}</h4><p>{t("Monday – Friday, 8:30 AM – 5:00 PM", "ሰኞ - አርብ፣ 8:30 ጠዋት - 5:00 ከሰዓት")}</p></div>
                </div>
              </div>

              <div className="map-ph">
                <IconPin width={30} height={30} />
                <span>{t("Map — Hosaena, Hadiya Zone, Ethiopia", "ካርታ — ሆሳዕና፣ የሀድያ ዞን፣ ኢትዮጵያ")}</span>
              </div>
            </div>

            <div className="card form-card">
              {success ? (
                <div className="success-panel show">
                  <div className="stamp"><IconCheck width={52} height={52} /></div>
                  <h3>{t("Message Sent", "መልዕክት ተልኳል")}</h3>
                  <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>{t("Thank you for reaching out. Your reference number is below.", "ስላገኙን እናመሰግናለን። የማጣቀሻ ቁጥርዎ ከዚህ በታች ይገኛል።")}</p>
                  <div className="ref-code">{success}</div>
                  <div style={{ marginTop: 26 }}>
                    <button type="button" className="btn btn-outline" onClick={resetForm}>
                      <span>{t("Send Another Message", "ሌላ መልዕክት ላክ")}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3>{t("Send a Message", "መልዕክት ይላኩ")}</h3>
                  <p className="sub">{t("We typically respond within 2 business days.", "በአብዛኛው በ2 የስራ ቀናት ውስጥ ምላሽ እንሰጣለን።")}</p>
                  {serverError && <div className="err-msg" style={{ display: "block" }}>{serverError}</div>}

                  <div className="field-row">
                    <div className={`field${errors.name ? " has-error" : ""}`}>
                      <label>{t("Full Name *", "ሙሉ ስም *")}</label>
                      <input type="text" className={errors.name ? "invalid" : ""} value={fields.name} onChange={(e) => setField("name", e.target.value)} placeholder={t("Your name", "ስምዎ")} />
                      <div className="err-msg">{t("Please enter your name.", "እባክዎ ስምዎን ያስገቡ።")}</div>
                    </div>
                    <div className={`field${errors.email ? " has-error" : ""}`}>
                      <label>{t("Email *", "ኢሜይል *")}</label>
                      <input type="email" className={errors.email ? "invalid" : ""} value={fields.email} onChange={(e) => setField("email", e.target.value)} placeholder="you@example.com" />
                      <div className="err-msg">{t("Please enter a valid email.", "እባክዎ ትክክለኛ ኢሜይል ያስገቡ።")}</div>
                    </div>
                  </div>

                  <div className={`field${errors.subject ? " has-error" : ""}`}>
                    <label>{t("Subject *", "ርዕስ *")}</label>
                    <select className={errors.subject ? "invalid" : ""} value={fields.subject} onChange={(e) => setField("subject", e.target.value)}>
                      <option value="">{t("Select a subject", "ርዕስ ይምረጡ")}</option>
                      <option value="general">{t("General Inquiry", "አጠቃላይ ጥያቄ")}</option>
                      <option value="report">{t("Report Submission Support", "የሪፖርት ማስገቢያ ድጋፍ")}</option>
                      <option value="governance">{t("Good Governance", "መልካም አስተዳደር")}</option>
                      <option value="hr">{t("Human Resources", "የሰዉ ሀብት")}</option>
                      <option value="other">{t("Other", "ሌላ")}</option>
                    </select>
                    <div className="err-msg">{t("Please select a subject.", "እባክዎ ርዕስ ይምረጡ።")}</div>
                  </div>

                  <div className={`field${errors.message ? " has-error" : ""}`}>
                    <label>{t("Message *", "መልዕክት *")}</label>
                    <textarea className={errors.message ? "invalid" : ""} value={fields.message} onChange={(e) => setField("message", e.target.value)} placeholder={t("How can we help?", "እንዴት ልንረዳዎት እንችላለን?")} />
                    <div className="err-msg">{t("Please enter a message.", "እባክዎ መልዕክት ያስገቡ።")}</div>
                  </div>

                  <button type="submit" className="btn btn-deep btn-block" disabled={isSubmitting}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    <span>{isSubmitting ? t("Sending...", "በመላክ ላይ...") : t("Send Message", "መልዕክት ላክ")}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
