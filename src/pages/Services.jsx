import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import TeamIcon from "../components/TeamIcon";
import { TEAMS } from "../data/teams";
import { IconFileReport, IconUsers, IconArrowRight } from "../components/Icons";

export default function Services() {
  const { t } = useApp();

  return (
    <>
      <PageHero
        amLine="አገልግሎቶች"
        en="Services"
        p={t(
          "Two ways to work with the Department — submit a report, or find the right administrator to reach.",
          "ከመምሪያው ጋር ለመስራት ሁለት መንገዶች — ሪፖርት ያስገቡ ወይም ትክክለኛውን ኃላፊ ያግኙ።"
        )}
        crumbs={[{ en: "Services", am: "አገልግሎቶች" }]}
      />

      <section>
        <div className="wrap">
          <Reveal as="div" className="section-head">
            <span className="eyebrow">{t("What You Can Do Here", "እዚህ ምን ማድረግ ይችላሉ")}</span>
            <h2>{t("Choose a Service", "አገልግሎት ይምረጡ")}</h2>
          </Reveal>

          <div className="services-grid" data-stagger>
            <Reveal as={Link} to="/report" variant="scale" className="service-card">
              <div className="service-card-icon"><IconFileReport width={26} height={26} /></div>
              <h3>{t("Report Submission", "ሪፖርት ማስገቢያ")}</h3>
              <p>{t(
                "Submit your weekly or monthly work report as a PDF, image, or document, and route it directly to the responsible administrator.",
                "ሳምንታዊ ወይም ወርሃዊ የስራ ሪፖርትዎን በፒዲኤፍ፣ ምስል ወይም ሰነድ መልክ በማያያዝ ለሚመለከተው ኃላፊ በቀጥታ ይላኩ።"
              )}</p>
              <span className="service-card-link">
                <span>{t("Go to Report Submission", "ወደ ሪፖርት ማስገቢያ ይሂዱ")}</span>
                <IconArrowRight width={16} height={16} />
              </span>
            </Reveal>

            <Reveal as={Link} to="/administrators" variant="scale" delay={100} className="service-card">
              <div className="service-card-icon"><IconUsers width={26} height={26} /></div>
              <h3>{t("Administrators", "አስተዳዳሪዎች")}</h3>
              <p>{t(
                "Meet the department head and senior officials, and reach any of them directly by phone or email.",
                "የመምሪያውን ኃላፊና ከፍተኛ ባለስልጣናትን ይተዋወቁ፣ በስልክ ወይም በኢሜይል በቀጥታ ያግኟቸው።"
              )}</p>
              <span className="service-card-link">
                <span>{t("Go to Administrators", "ወደ አስተዳዳሪዎች ይሂዱ")}</span>
                <IconArrowRight width={16} height={16} />
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- DEPARTMENT TEAMS ---------------- */}
      <section className="section-alt">
        <div className="wrap">
          <Reveal as="div" className="section-head">
            <span className="eyebrow">{t("Our Teams", "ቡድኖቻችን")}</span>
            <h2>{t("Department Teams & Services", "የመምሪያ ቡድኖችና አገልግሎቶች")}</h2>
            <p>{t(
              "Every report or inquiry is handled by the team responsible for that subject area.",
              "እያንዳንዱ ሪፖርት ወይም ጥያቄ ለሚመለከተው ቡድን ይተላለፋል።"
            )}</p>
          </Reveal>

          <div className="team-grid" data-stagger>
            {TEAMS.map((team, i) => (
              <Reveal as="div" className="team-card" delay={i * 45} key={team.en}>
                <span className="t-icon"><TeamIcon name={team.icon} width={19} height={19} /></span>
                <span>{t(team.en, team.am)}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
