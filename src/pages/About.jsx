import { useApp } from "../context/AppContext";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { useReveal } from "../hooks/useReveal";
import { useCounter } from "../hooks/useCounter";
import TeamIcon from "../components/TeamIcon";
import { TEAMS } from "../data/teams";
import { IconTarget, IconEye, IconGauge, IconStar, IconHeart, IconBadge, IconUsers } from "../components/Icons";

export default function About() {
  const { t } = useApp();
  const [statsRef, statsVisible] = useReveal();
  const teamsCount = useCounter(String(TEAMS.length), statsVisible);
  const employees = useCounter("41,000+", statsVisible);

  return (
    <>
      <PageHero
        amLine="ስለ መምሪያው"
        en="About the Department"
        p={t(
          "A closer look at our mandate, structure, and the standards we hold ourselves to.",
          "ስለ ስልጣናችን፣ አደረጃጀታችንና ራሳችንን የምንመዝንባቸው መስፈርቶች ዝርዝር መረጃ።"
        )}
        crumbs={[{ en: "About", am: "ስለ እኛ" }]}
      />

      {/* ---------------- OVERVIEW + STATS ---------------- */}
      <section>
        <div className="wrap">
          <Reveal as="div" className="section-head">
            <span className="eyebrow">{t("Who We Are", "እኛ ማን ነን")}</span>
            <h2>{t("Serving Hadiya Zone's Public Institutions", "የሀድያ ዞን የመንግስት ተቋማትን ማገልገል")}</h2>
            <p>{t(
              "The Hadiya Zone Public Service & Human Resource Development Department, under the Central Ethiopia Regional State, is mandated to strengthen how public offices across the zone are organized, staffed, and held accountable — so that every resident receives a fair, timely, and dignified service.",
              "የሀድያ ዞን ፐብሊክ ሰርቪስና የሰዉ ኃብት ልማት መምሪያ በማዕከላዊ ኢትዮጵያ ክልላዊ መንግስት ስር የሚገኝ ሲሆን በዞኑ የሚገኙ የመንግስት ጽ/ቤቶች አደረጃጀት፣ የሰው ኃይል አመዳደብና ተጠያቂነት እንዲጠናከር ሃላፊነት ወስዷል።"
            )}</p>
          </Reveal>

          <div className="stat-row" data-stagger ref={statsRef}>
            <div className="stat-cell reveal-scale in-view"><div className="n">{teamsCount}</div><div className="l">{t("Specialist Teams", "የስራ ቡድኖች")}</div></div>
            <div className="stat-cell reveal-scale in-view"><div className="n">{employees}</div><div className="l">{t("Employees", "ሰራተኞች")}</div></div>
            <div className="stat-cell reveal-scale in-view"><div className="n">1</div><div className="l">{t("Zone Coordinating Office", "የዞን አስተባባሪ ጽ/ቤት")}</div></div>
            <div className="stat-cell reveal-scale in-view"><div className="n">2026</div><div className="l">{t("Portal Established", "ፖርታል የተመሰረተበት")}</div></div>
          </div>
        </div>
      </section>

      {/* ---------------- STRUCTURE (team titles only, no personal profiles) ---------------- */}
      <section className="section-alt">
        <div className="wrap">
          <Reveal as="div" className="section-head">
            <span className="eyebrow">{t("Structure", "አደረጃጀት")}</span>
            <h2>{t("How the Department is Organized", "የመምሪያው አደረጃጀት")}</h2>
            <p>{t(
              "Reports and requests are routed to the team responsible for that subject area.",
              "ሪፖርቶችና ጥያቄዎች ለሚመለከታቸው የስራ ቡድን ይመራሉ።"
            )}</p>
          </Reveal>

          <div className="timeline-org" data-stagger>
            <Reveal as="div" className="org-node head">
              <span className="num">—</span>
              <div className="org-node-copy">
                <h4>{t("Department Head", "የመምሪያ ሀላፊ")}</h4>
                <p>{t("Overall leadership and accountability for the department", "የመምሪያው አጠቃላይ አመራርና ተጠያቂነት")}</p>
              </div>
            </Reveal>
            {TEAMS.map((team, i) => (
              <Reveal as="div" className="org-node" key={team.en} delay={i * 40}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div className="node-avatar" style={{ background: "var(--paper-dim)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)" }}>
                  <TeamIcon name={team.icon} width={30} height={30} />
                </div>
                <div className="org-node-copy">
                  <h4>{team.en}</h4>
                  <p className="org-node-am">{team.am}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- MISSION / VISION / VALUES ---------------- */}
      <section>
        <div className="wrap">
          <Reveal as="div" className="section-head">
            <span className="eyebrow">{t("Our Mandate", "ተልዕኳችን")}</span>
            <h2>{t("Mission, Vision & Values — In Full", "ተልዕኮ፣ ራዕይና እሴቶች")}</h2>
          </Reveal>

          <div className="mv-grid" data-stagger>
            <Reveal as="div" className="mv-card">
              <span className="icon-badge"><IconTarget width={22} height={22} /></span>
              <h3>{t("Mission (ተልዕኮ)", "ተልዕኮ (Mission)")}</h3>
              <p className="mv-am">በዞኑ የመንግስትን ፖሊሲዎች ስትራቲጅዎች በብቃት ለመፈጸም የምያስችሉ የተዘረጋዉን አዳዲስ አሰራሮችንና አደራጃጀቶችን የአማራሩንና የሰራተኛዉን አመለካከት በመለወጥና ብቃቱን በማሳደግ ሕዝብን በቅንነትና በታማኝነት የሚያገለግል ጠንካርና ዉጠታማ የመንግስት አገልግሎት መፍጠር ነዉ።</p>
              <p className="mv-en">To create a strong and effective public service that serves the people with integrity and honesty — by implementing new systems and structures that enable efficient execution of government policies and strategies in the zone, and by transforming the outlook of management and staff while building their capacity.</p>
            </Reveal>
            <Reveal as="div" className="mv-card" delay={100}>
              <span className="icon-badge"><IconEye width={22} height={22} /></span>
              <h3>{t("Vision (ራዕይ)", "ራዕይ (Vision)")}</h3>
              <p className="mv-am">በ 2022 ተለዕኮዉን በዉጤታማነት መፈጸም የቻለ በስነምግባሩ የተመሰገነ ንጻ ገለልተኛና ብቃት ያለዉ የመንግስታገልግሎት ዘርፍና አገልጋይ ዕዉን ሆኖ ማየት።</p>
              <p className="mv-en">To see, by 2022 (E.C.), a public service sector and public servant that has effectively carried out its mission — recognized for integrity, transparent, impartial, and competent.</p>
            </Reveal>
          </div>

          <div className="values-header" data-stagger>
            <Reveal as="div" className="section-head values-head">
              <span className="eyebrow">{t("Values", "እሴቶች")}</span>
              <h2>{t("Values", "እሴቶች")}</h2>
            </Reveal>
          </div>

          <div className="values-grid" style={{ marginTop: 24 }} data-stagger>
            <Reveal as="div" variant="scale" className="value-card"><IconGauge className="value-mark" width={30} height={30} /><div className="v-am">ችግር ፈቺነት</div><div className="v-en">Problem-solving</div></Reveal>
            <Reveal as="div" variant="scale" className="value-card" delay={60}><IconStar className="value-mark" width={30} height={30} /><div className="v-am">ቅድሚያ ለብቃት፣ ለልህቀትና ለለውጥ መስራት</div><div className="v-en">Competence &amp; change</div></Reveal>
            <Reveal as="div" variant="scale" className="value-card" delay={120}><IconHeart className="value-mark" width={30} height={30} /><div className="v-am">ክብር ለተገልጋይ</div><div className="v-en">Respect for the service seeker</div></Reveal>
            <Reveal as="div" variant="scale" className="value-card" delay={180}><IconBadge className="value-mark" width={30} height={30} /><div className="v-am">ፍትሃዊነትና አለማዳላት</div><div className="v-en">Fairness &amp; impartiality</div></Reveal>
            <Reveal as="div" variant="scale" className="value-card" delay={240}><IconUsers className="value-mark" width={30} height={30} /><div className="v-am">ቅንነት፣ ታማኝነትና አካታችነት እና ሁሌም መማር</div><div className="v-en">Integrity &amp; lifelong learning</div></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
