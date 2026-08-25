import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageHero from "../components/PageHero";
import { TEAMS } from "../data/teams";
import { IconUpload, IconFile, IconCheck, IconLock, IconFileReport, IconShieldCheck } from "../components/Icons";

const ACCEPTED = [".pdf", ".jpg", ".jpeg", ".png"];

function humanSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function AuthGate() {
  const { t } = useApp();
  return (
    <div className="auth-gate">
      <div className="lock-icon"><IconLock width={28} height={28} /></div>
      <h3>{t("Log In to Submit a Report", "ሪፖርት ለማስገባት ይግቡ")}</h3>
      <p>{t(
        "For accountability, work reports must be submitted from a signed-in employee account.",
        "ለተጠያቂነት፣ የስራ ሪፖርቶች ከገባ የሰራተኛ አካውንት መላክ አለባቸው።"
      )}</p>
      <Link to="/login" className="btn btn-deep">
        <IconLock width={16} height={16} />
        <span>{t("Log In", "ግባ")}</span>
      </Link>
    </div>
  );
}

function ReportForm() {
  const { t, lang } = useApp();
  const [fields, setFields] = useState({
    fullName: "", empId: "", office: "", position: "",
    periodStart: "", periodEnd: "", notes: "",
  });
  const [reportType, setReportType] = useState("weekly");
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [dragging, setDragging] = useState(false);
  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  function setField(key, val) {
    setFields((f) => ({ ...f, [key]: val }));
  }

  function addFiles(fileList) {
    const next = [];
    Array.from(fileList).forEach((f) => {
      const ext = "." + f.name.split(".").pop().toLowerCase();
      if (!ACCEPTED.includes(ext)) {
        alert((lang === "am" ? "የማይደገፍ ፋይል አይነት፦ " : "Unsupported file type: ") + f.name);
        return;
      }
      next.push(f);
    });
    if (next.length) setFiles((prev) => [...prev, ...next]);
  }

  function removeFile(idx) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  function validate() {
    const req = ["fullName", "empId", "office", "position", "periodStart", "periodEnd"];
    const errs = {};
    req.forEach((key) => {
      if (!String(fields[key]).trim()) errs[key] = true;
    });
    if (!files.length) errs.files = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setServerError("");
    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
    formData.append("reportType", reportType);
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("http://localhost:3000/api/reports", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken") || ""}` },
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Unable to submit report");
      setSuccess(data.reference);
    } catch (requestError) {
      setServerError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setFields({ fullName: "", empId: "", office: "", position: "", periodStart: "", periodEnd: "", notes: "" });
    setReportType("weekly");
    setFiles([]);
    setErrors({});
    setSuccess(null);
    setServerError("");
  }

  if (success) {
    return (
      <div className="success-panel show">
        <div className="stamp"><IconCheck width={52} height={52} /></div>
        <h3>{t("Report Submitted", "ሪፖርት ገብቷል")}</h3>
        <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>{t(
          "Your reference number has been generated. Keep it to track your submission's status.",
          "የማጣቀሻ ቁጥርዎ ተፈጥሯል። የማስገቢያዎን ሁኔታ ለመከታተል ያስቀምጡት።"
        )}</p>
        <div className="ref-code">{success}</div>
        <div style={{ marginTop: 26 }}>
          <button type="button" className="btn btn-outline" onClick={resetForm}>
            <span>{t("Submit Another Report", "ሌላ ሪፖርት ላክ")}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{t("Report Details", "የሪፖርት ዝርዝር")}</h3>
      <p className="sub">{t("Fields marked with * are required.", "በ * የተመለከቱ መስኮች የግድ መሞላት አለባቸው።")}</p>
      {serverError && <div className="err-msg" style={{ display: "block" }}>{serverError}</div>}

      <div className="field">
        <label>{t("Report Type *", "የሪፖርት አይነት *")}</label>
        <div className="radio-group">
          {[["weekly", "Weekly", "ሳምንታዊ"], ["monthly", "Monthly", "ወርሃዊ"], ["custom", "Custom Period", "ሌላ ጊዜ"]].map(([val, en, am]) => (
            <label className="radio-pill" key={val}>
              <input type="radio" name="reportType" checked={reportType === val} onChange={() => setReportType(val)} />
              <span>{t(en, am)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="field-row">
        <div className={`field${errors.fullName ? " has-error" : ""}`}>
          <label>{t("Full Name *", "ሙሉ ስም *")}</label>
          <input type="text" className={errors.fullName ? "invalid" : ""} value={fields.fullName} onChange={(e) => setField("fullName", e.target.value)} placeholder={t("e.g. Abebe Kebede", "ለምሳሌ አበበ ከበደ")} />
          <div className="err-msg">{t("Please enter your full name.", "እባክዎ ሙሉ ስምዎን ያስገቡ።")}</div>
        </div>
        <div className={`field${errors.empId ? " has-error" : ""}`}>
          <label>{t("Employee ID *", "የሰራተኛ መለያ ቁጥር *")}</label>
          <input type="text" className={errors.empId ? "invalid" : ""} value={fields.empId} onChange={(e) => setField("empId", e.target.value)} placeholder={t("e.g. HZ-2481", "ለምሳሌ HZ-2481")} />
          <div className="err-msg">{t("Please enter your employee ID.", "እባክዎ የሰራተኛ መለያ ቁጥርዎን ያስገቡ።")}</div>
        </div>
      </div>

      <div className="field-row">
        <div className={`field${errors.office ? " has-error" : ""}`}>
          <label>{t("Office / Team *", "ጽ/ቤት / ቡድን *")}</label>
          <select className={errors.office ? "invalid" : ""} value={fields.office} onChange={(e) => setField("office", e.target.value)}>
            <option value="">{t("Select your office", "ጽ/ቤትዎን ይምረጡ")}</option>
            {TEAMS.map((team) => (
              <option value={team.en} key={team.en}>{t(team.en, team.am)}</option>
            ))}
            <option value="other">{t("Other Zone Office", "ሌላ የዞን ጽ/ቤት")}</option>
          </select>
          <div className="err-msg">{t("Please select your office or team.", "እባክዎ ጽ/ቤትዎን ወይም ቡድንዎን ይምረጡ።")}</div>
        </div>
        <div className={`field${errors.position ? " has-error" : ""}`}>
          <label>{t("Position *", "የስራ ድርሻ *")}</label>
          <input type="text" className={errors.position ? "invalid" : ""} value={fields.position} onChange={(e) => setField("position", e.target.value)} placeholder={t("e.g. Senior Expert", "ለምሳሌ ከፍተኛ ባለሙያ")} />
          <div className="err-msg">{t("Please enter your position.", "እባክዎ የስራ ድርሻዎን ያስገቡ።")}</div>
        </div>
      </div>

      <div className="field-row">
        <div className={`field${errors.periodStart ? " has-error" : ""}`}>
          <label>{t("Report Period — Start *", "የሪፖርት ጊዜ — መጀመሪያ *")}</label>
          <input type="date" className={errors.periodStart ? "invalid" : ""} value={fields.periodStart} onChange={(e) => setField("periodStart", e.target.value)} />
          <div className="err-msg">{t("Please select a start date.", "እባክዎ የመጀመሪያ ቀን ይምረጡ።")}</div>
        </div>
        <div className={`field${errors.periodEnd ? " has-error" : ""}`}>
          <label>{t("Report Period — End *", "የሪፖርት ጊዜ — መጨረሻ *")}</label>
          <input type="date" className={errors.periodEnd ? "invalid" : ""} value={fields.periodEnd} onChange={(e) => setField("periodEnd", e.target.value)} />
          <div className="err-msg">{t("Please select an end date.", "እባክዎ የመጨረሻ ቀን ይምረጡ።")}</div>
        </div>
      </div>

      <div className="field">
        <label>{t("This Report Will Be Sent To", "ይህ ሪፖርት የሚላከው ለ")}</label>
        <div className="recipient-fixed">
          <div className="avatar-ph has-photo" style={{ width: 88, height: 110, borderRadius: 14 }}>
            <img src="assets/admins/handebo.jpg" alt="Mr. Handebo Galichamo Gaenore" />
          </div>
          <div>
            <div className="r-name-am">አቶ ህንዴቦ ጋልቻሞ ጋዕኖሬ</div>
            <div className="r-name-en">Mr. Handebo Galichamo Gaenore</div>
            <div className="r-role">{t("Department Head — routes each report to the responsible team", "የመምሪያ ሀላፊ — ለሚመለከተው ቡድን ሪፖርቱን ያስተላልፋል")}</div>
          </div>
        </div>
      </div>

      <div className="field">
        <label>{t("Attach Report File(s) *", "የሪፖርት ፋይል(ሎች) ያያይዙ *")}</label>
        <div
          className={`dropzone${dragging ? " drag" : ""}`}
          tabIndex={0}
          role="button"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
          onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        >
          <IconUpload width={32} height={32} />
          <div className="dz-title">{t("Click to upload or drag and drop", "ለመስቀል ይጫኑ ወይም ጎትተው ይጣሉ")}</div>
          <div className="dz-sub">{t("PDF or JPG/PNG images — up to 10 files, 10 MB each", "PDF ወይም JPG/PNG ምስሎች — እስከ 10 ፋይሎች፣ እያንዳንዱ እስከ 10 MB")}</div>
          <input ref={inputRef} type="file" style={{ display: "none" }} multiple accept={ACCEPTED.join(",")} onChange={(e) => addFiles(e.target.files)} />
        </div>
        {errors.files && <div className="err-msg" style={{ display: "block" }}>{t("Please attach at least one PDF or image.", "እባክዎ ቢያንስ አንድ PDF ወይም ምስል ያያይዙ።")}</div>}
        <div className="file-list">
          {files.map((f, idx) => (
            <div className="file-chip" key={f.name + idx}>
              <IconFile width={16} height={16} />
              <span className="fname">{f.name}</span>
              <span className="fsize">{humanSize(f.size)}</span>
              <button type="button" className="rm" aria-label="Remove file" onClick={() => removeFile(idx)}>&times;</button>
            </div>
          ))}
        </div>
      </div>

      <div className="field">
        <label>{t("Summary / Notes (optional)", "ማጠቃለያ / ማስታወሻ (አማራጭ)")}</label>
        <textarea value={fields.notes} onChange={(e) => setField("notes", e.target.value)} placeholder={t("Brief summary of the work covered in this report...", "ይህ ሪፖርት የሚሸፍነውን ስራ አጭር ማጠቃለያ...")} />
      </div>

      <button type="submit" className="btn btn-deep btn-block" disabled={isSubmitting}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
        <span>{isSubmitting ? t("Submitting...", "በመላክ ላይ...") : t("Submit Report", "ሪፖርት ላክ")}</span>
      </button>
    </form>
  );
}

export default function Report() {
  const { t, user } = useApp();

  return (
    <>
      <PageHero
        amLine="የስራ ሪፖርት ማስገቢያ"
        en="Work Report Submission"
        p={t(
          "Submit your weekly or monthly work report as a PDF, image, or document, and route it directly to the responsible administrator.",
          "ሳምንታዊ ወይም ወርሃዊ የስራ ሪፖርትዎን በፒዲኤፍ፣ ምስል ወይም ሰነድ መልክ በማያያዝ ለሚመለከተው ኃላፊ በቀጥታ ይላኩ።"
        )}
        crumbs={[{ to: "/services", en: "Services", am: "አገልግሎቶች" }, { en: "Report Submission", am: "ሪፖርት ማስገቢያ" }]}
      />

      <section>
        <div className="wrap">
          <div className="form-shell">
            <div className="card form-card">
              {user ? <ReportForm /> : <AuthGate />}
            </div>

            <div className="side-stack">
              <div className="card info-card">
                <h4><IconFileReport width={18} height={18} /><span>{t("Accepted File Types", "ተቀባይነት ያላቸው ፋይል አይነቶች")}</span></h4>
                <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.8 }}>{t(
                  "PDF documents, JPG/PNG images, and Word (.doc/.docx) or plain text files. Attach as many files as your report needs — there's no size limit.",
                  "ፒዲኤፍ ሰነዶች፣ JPG/PNG ምስሎች እና Word (.doc/.docx) ወይም text ፋይሎች። ሪፖርትዎ የሚያስፈልገውን ያህል ፋይል ማያያዝ ይችላሉ — የመጠን ገደብ የለም።"
                )}</p>
              </div>
              <div className="card info-card">
                <h4><IconShieldCheck width={18} height={18} /><span>{t("Privacy", "ግላዊነት")}</span></h4>
                <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.8 }}>{t(
                  "Submitted files are only visible to you and the administrator you route them to.",
                  "የገቡ ፋይሎች ለእርስዎና ላስተላለፉለት ኃላፊ ብቻ ይታያሉ።"
                )}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
