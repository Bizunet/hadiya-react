import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { IconInfo, IconRefresh } from "../components/Icons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function formatDate(value, language) {
  return new Intl.DateTimeFormat(language === "am" ? "am-ET" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export default function Announcements() {
  const { t, lang } = useApp();
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  async function loadAnnouncements() {
    setLoading(true);
    setLoadError("");
    try {
      const response = await fetch(`${API_URL}/api/announcements`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load announcements");
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnnouncements();
  }, []);

  return (
    <>
      <PageHero
        amLine="ማስታወቂያዎች"
        en="Announcements"
        p={t(
          "Stay informed about the latest updates, deadlines, and notices from the Department.",
          "ስለ መምሪያው የቅርብ ጊዜ ዝመናዎች፣ የጊዜ ገደቦችና ማስታወቂያዎች መረጃ ያግኙ።"
        )}
        crumbs={[{ en: "Announcements", am: "ማስታወቂያዎች" }]}
      />

      <section>
        <div className="wrap announcements-shell">
          <div className="section-head">
            <span className="eyebrow">{t("Department Updates", "የመምሪያው ዝመናዎች")}</span>
            <h2>{t("Latest announcements", "የቅርብ ጊዜ ማስታወቂያዎች")}</h2>
          </div>

          {loading && <div className="card announcements-state"><p className="sub">{t("Loading announcements...", "ማስታወቂያዎች በመጫን ላይ...")}</p></div>}

          {loadError && (
            <div className="notice announcements-error">
              <IconInfo width={19} height={19} />
              <span>{loadError}</span>
              <button className="btn btn-outline" type="button" onClick={loadAnnouncements}>
                <IconRefresh width={16} height={16} />
                <span>{t("Try again", "እንደገና ይሞክሩ")}</span>
              </button>
            </div>
          )}

          {!loading && !loadError && announcements.length === 0 && (
            <div className="card announcements-state">
              <IconInfo width={30} height={30} />
              <h3>{t("No announcements yet", "እስካሁን ማስታወቂያ የለም")}</h3>
              <p className="sub">{t("Published department updates will appear here.", "የታተሙ የመምሪያው ዝመናዎች እዚህ ይታያሉ።")}</p>
            </div>
          )}

          {!loading && !loadError && announcements.length > 0 && (
            <div className="announce-list announcements-page-list">
              {announcements.map((announcement, index) => (
                <Reveal as="article" className="announce-item" delay={index * 60} key={announcement.id}>
                  <div className="announce-date">
                    <div className="d">{new Date(announcement.createdAt).getDate()}</div>
                    <div className="m">{new Intl.DateTimeFormat(lang === "am" ? "am-ET" : "en-US", { month: "short" }).format(new Date(announcement.createdAt))}</div>
                  </div>
                  <button className="announcement-copy announcement-trigger" type="button" onClick={() => setSelectedAnnouncement(announcement)}>
                    <h4>{announcement.title}</h4>
                    <p className="announcement-meta">{formatDate(announcement.createdAt, lang)}</p>
                    <p>{announcement.body}</p>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedAnnouncement && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedAnnouncement(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="announcement-dialog-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label={t("Close announcement", "ማስታወቂያውን ዝጋ")} onClick={() => setSelectedAnnouncement(null)}>x</button>
            <span className="eyebrow">{t("Department Announcement", "የመምሪያ ማስታወቂያ")}</span>
            <h2 id="announcement-dialog-title">{selectedAnnouncement.title}</h2>
            <p className="announcement-meta">{formatDate(selectedAnnouncement.createdAt, lang)}</p>
            <p className="modal-copy">{selectedAnnouncement.body}</p>
          </div>
        </div>
      )}
    </>
  );
}
