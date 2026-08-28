import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import HeroSlideshow from "../components/HeroSlideshow";
import Reveal from "../components/Reveal";
import { useReveal } from "../hooks/useReveal";
import { useCounter } from "../hooks/useCounter";
import { IconStar, IconMail, IconFileReport, IconUsers } from "../components/Icons";

const QUICK_LINKS = [
  { to: "/about", en: "About", am: "ስለ እኛ", icon: "info" },
  { to: "/services", en: "Services", am: "አገልግሎቶች", icon: "grid" },
  { to: "/report", en: "Report Submission", am: "ሪፖርት ማስገቢያ", icon: "file" },
  { to: "/administrators", en: "Administrators", am: "አስተዳዳሪዎች", icon: "users" },
  { to: "/contact", en: "Contact", am: "አግኙን", icon: "mail" },
];

function QuickIcon({ name, ...p }) {
  switch (name) {
    case "info": return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>;
    case "grid": return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>;
    case "file": return <IconFileReport {...p} />;
    case "users": return <IconUsers {...p} />;
    case "mail": return <IconMail {...p} />;
    default: return null;
  }
}

export default function Home() {
  const { t } = useApp();
  const [statsRef, statsVisible] = useReveal();
  const depts = useCounter("8+", statsVisible);
  const [publicStats, setPublicStats] = useState({ totalEmployees: "41,000+", totalReports: "0" });
  const employees = useCounter(publicStats.totalEmployees, statsVisible);
  const reports = useCounter(publicStats.totalReports, statsVisible);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/stats/public`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load public statistics");
        return response.json();
      })
      .then((data) => {
        setPublicStats({
          totalEmployees: Number.isFinite(Number(data.totalEmployees)) ? String(data.totalEmployees) : "41,000+",
          totalReports: Number.isFinite(Number(data.totalReports)) ? String(data.totalReports) : "0",
        });
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <HeroSlideshow>
        <div>
          <span className="hero-kicker">
            <IconStar width={14} height={14} />
            <span>{t("Official Public Service Portal", "ኦፊሴላዊ የፐብሊክ ሰርቪስ ፖርታል")}</span>
          </span>
          <h1>
            <span className="am-line">በማዕከላዊ ኢትዮጵያ ክልላዊ መንግስት የሀድያ ዞን ፐብሊክ ሰርቪስና የሰዉ ኃብት ልማት መምሪያ</span>
            <span>{t(
              "Central Ethiopia Regional State — Hadiya Zone Public Service & Human Resource Development Department",
              "Central Ethiopia Regional State — Hadiya Zone Public Service & Human Resource Development Department"
            )}</span>
          </h1>
          <p className="lead">{t(
            "A strong, ethical, and efficient public service — built by transforming how offices work, and how employees are heard.",
            "ጠንካራና ውጤታማ የመንግስት አገልግሎት ለመፍጠር የሚያስችል መድረክ፣ የጽ/ቤቶችን አሰራርና የሰራተኞችን ድምጽ በመለወጥ የተገነባ።"
          )}</p>
          <div className="hero-actions">
            <Link to="/administrators" className="btn btn-ghost-light">
              <span>{t("Meet the Leadership", "አመራሩን ይተዋወቁ")}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </div>
        </div>

        <div className="leader-card">
          <span className="tag">{t("Department Head", "የመምሪያው ኃላፊ")}</span>
          <div className="leader-row">
            <div className="avatar-ph lg has-photo">
              <img src="assets/admins/handebo.jpg" alt="Mr. Handebo Galichamo Gaenore" />
            </div>
            <div>
              <div className="leader-name-am">አቶ ሀንዴቦ ጋልቻሞ ጋዕኖሬ</div>
              <div className="leader-name-en">Mr. Handebo Galichamo Gaenore</div>
            </div>
          </div>
          <p className="leader-title">{t(
            "Head, Hadiya Zone Public Service & Human Resource Development Department",
            "የሀድያ ዞን ፐብሊክ ሰርቪስና የሰዉ ሀብት ልማት መምርያ ሀላፊ"
          )}</p>
          <div className="contact-line">
            <IconMail width={15} height={15} />
            <a href="mailto:galichamoh@gmail.com">galichamoh@gmail.com</a>
          </div>
        </div>
      </HeroSlideshow>

      {/* ---------------- STATS ---------------- */}
      <section>
        <div className="wrap" ref={statsRef}>
          <div className="stat-row" data-stagger>
            <div className="stat-cell reveal-scale in-view"><div className="n">{depts}</div><div className="l">{t("Active Departments", "ንቁ ክፍሎች")}</div></div>
            <div className="stat-cell reveal-scale in-view"><div className="n">{employees}</div><div className="l">{t("Employees", "ሰራተኞች")}</div></div>
            <div className="stat-cell reveal-scale in-view"><div className="n">{reports}</div><div className="l">{t("Reports Submitted", "የቀረቡ ሪፖርቶች")}</div></div>
            <div className="stat-cell reveal-scale in-view"><div className="n">10</div><div className="l">{t("Specialist Teams", "የስራ ቡድኖች")}</div></div>
            <div className="stat-cell reveal-scale in-view"><div className="n">2026</div><div className="l">{t("Portal Established", "ፖርታል የተመሰረተበት")}</div></div>
          </div>
        </div>
      </section>

      {/* ---------------- QUICK LINKS ---------------- */}
      <section className="section-alt">
        <div className="wrap">
          <Reveal as="div" className="section-head">
            <span className="eyebrow">{t("Get Where You Need to Go", "የሚፈልጉትን በፍጥነት ያግኙ")}</span>
            <h2>{t("Quick Links", "ፈጣን አገናኞች")}</h2>
          </Reveal>
          <div className="quick-links-grid" data-stagger>
            {QUICK_LINKS.map((q, i) => (
              <Reveal as={Link} to={q.to} variant="scale" delay={i * 60} className="quick-link-card" key={q.to}>
                <span className="quick-link-icon"><QuickIcon name={q.icon} width={21} height={21} /></span>
                <span>{t(q.en, q.am)}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
