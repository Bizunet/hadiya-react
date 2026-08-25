import { useEffect, useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { SealWatermark } from "../components/Seal";
import { TEAM_FILTERS } from "../data/administrators";
import { IconMail, IconPhone, IconSearch, IconInfo } from "../components/Icons";

function ContactDetails({ email, phone, t }) {
  if (!email && !phone) {
    return (
      <div className="a-contact-details">
        <span className="no-contact"><IconInfo width={15} height={15} /> <span>{t("Contact not yet available", "ግንኙነት በመጠባበቅ ላይ")}</span></span>
      </div>
    );
  }
  return (
    <div className="a-contact-details">
      {phone && <a href={`tel:${phone}`}><IconPhone width={15} height={15} /> {phone}</a>}
      {email && <a href={`mailto:${email}`}><IconMail width={15} height={15} /> {email}</a>}
    </div>
  );
}

export default function Administrators() {
  const { t } = useApp();
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("");
  const [administrators, setAdministrators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  
  const API_URL = import.meta.env.API_URL;

  useEffect(() => {
    async function loadAdministrators() {
      try {
        const response = await fetch(`${API_URL}/api/administrators`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to load administrators");
        setAdministrators(data);
      } catch (error) {
        setLoadError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadAdministrators();
  }, []);

  const leader = administrators.find((administrator) => administrator.isLeader);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return administrators.filter((a) => {
      if (a.isLeader) return false;
      const matchesQ = !q || a.nameEn.toLowerCase().includes(q) || a.roleEn.toLowerCase().includes(q) || a.nameAm.includes(q);
      const matchesTeam = !team || a.team === team;
      return matchesQ && matchesTeam;
    });
  }, [administrators, query, team]);

  return (
    <>
      <PageHero
        amLine="አስተዳዳሪዎች"
        en="Leadership Directory"
        p={t(
          "Meet the department head and senior officials responsible for each area of the Department's work.",
          "የመምሪያውን ኃላፊና በእያንዳንዱ የስራ ዘርፍ ኃላፊነት ያለባቸውን ከፍተኛ ባለስልጣናት ይተዋወቁ።"
        )}
        crumbs={[{ to: "/services", en: "Services", am: "አገልግሎቶች" }, { en: "Administrators", am: "አስተዳዳሪዎች" }]}
      />

      <section>
        <div className="wrap">
          {loading && <div className="card"><p className="sub">{t("Loading administrators...", "አስተዳዳሪዎች በመጫን ላይ...")}</p></div>}
          {loadError && <div className="notice"><IconInfo width={19} height={19} /><span>{loadError}</span></div>}
          {!loading && !loadError && leader && (
            <Reveal as="div" variant="scale" className="leader-feature">
              <SealWatermark style={{ "--sz": "220px", width: 220, height: 220, right: -40, top: -50 }} />
              <div className={`avatar-ph lg${leader.photo ? " has-photo" : ""}`} style={{ position: "relative", zIndex: 1 }}>
                {leader.photo && <img src={leader.photo} alt={leader.nameEn} />}
              </div>
              <div className="info">
                <span className="tag">{t("Department Head", "የመምሪያው ኃላፊ")}</span>
                <div className="a-name-am">{leader.nameAm}</div>
                <div className="a-name-en">{leader.nameEn}</div>
                <p className="a-role">{t(leader.roleEn, leader.roleAm)}</p>
                <ContactDetails email={leader.email} phone={leader.phone} t={t} />
              </div>
            </Reveal>
          )}

          {!loading && !loadError && <Reveal as="div" className="section-head" style={{ marginBottom: 24 }}>
            <span className="eyebrow">{t("Senior Officials", "ከፍተኛ ባለስልጣናት")}</span>
            <h2>{t("Team Leaders & Experts", "የቡድን መሪዎችና ባለሙያዎች")}</h2>
          </Reveal>}

          {!loading && !loadError && <div className="filter-bar">
            <div className="search-input">
              <IconSearch width={17} height={17} />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("Search by name or role...", "በስም ወይም በስራ ድርሻ ይፈልጉ...")} />
            </div>
            <select className="filter-select" value={team} onChange={(e) => setTeam(e.target.value)}>
              {TEAM_FILTERS.map((f) => (
                <option value={f.value} key={f.value || "all"}>{t(f.en, f.am)}</option>
              ))}
            </select>
          </div>}

          {!loading && !loadError && (filtered.length > 0 ? (
            <div className="admin-grid" data-stagger>
              {filtered.map((a, i) => (
                <Reveal as="div" variant="scale" delay={(i % 4) * 60} className="admin-card" key={a.key}>
                  <div className={`avatar-ph md${a.photo ? " has-photo" : ""}`}>
                    {a.photo && <img src={a.photo} alt={a.nameEn} />}
                  </div>
                  <div className="a-name-am">{a.nameAm}</div>
                  <div className="a-name-en">{a.nameEn}</div>
                  <p className="a-role">{t(a.roleEn, a.roleAm)}</p>
                  <span className="a-badge">{t(a.badgeEn, a.badgeAm)}</span>
                  <ContactDetails email={a.email} phone={a.phone} t={t} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="no-results show">
              <IconSearch width={40} height={40} style={{ margin: "0 auto 14px" }} />
              <p>{t("No administrators match your search.", "ከፍለጋዎ ጋር የሚዛመድ አስተዳዳሪ አልተገኘም።")}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
