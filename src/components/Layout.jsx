import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SealBrand, SealFooter } from "./Seal";
import {
  IconPhone, IconMail, IconPin, IconSun, IconMoon, IconMenu,
  IconFileReport, IconUsers, IconChevronDown, IconSettings, IconUser,
} from "./Icons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function AnnouncementNav({ count = 0 }) {
  const { t } = useApp();

  return (
    <Link className="nav-announcement" to="/announcements">
      <span>{t("Announcements", "ማስታወቂያዎች")}</span>
      {count > 0 && <span className="nav-item-badge">{count}</span>}
    </Link>
  );
}

function HeaderControls() {
  const { lang, setLang, theme, setTheme } = useApp();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    function onDocumentClick(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) setSettingsOpen(false);
    }
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  return (
    <div className={`nav-settings${settingsOpen ? " open" : ""}`} ref={settingsRef}>
      <button
        className="settings-toggle"
        aria-label="Open language and theme settings"
        aria-expanded={settingsOpen}
        onClick={() => setSettingsOpen((value) => !value)}
      >
        <IconSettings width={19} height={19} />
      </button>
      <div className="settings-menu">
        <div className="settings-group">
          <span className="settings-label">{lang === "am" ? "ቋንቋ" : "Language"}</span>
          <div className="lang-switch" role="group" aria-label="Language selector">
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "am" ? "active" : ""} onClick={() => setLang("am")}>አማ</button>
          </div>
        </div>
        <div className="settings-group">
          <span className="settings-label">{lang === "am" ? "ገጽታ" : "Theme"}</span>
          <button
            className="theme-toggle"
            aria-label="Toggle dark mode"
            aria-pressed={theme === "dark"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <IconSun className="ic-sun" width={16} height={16} />
            <IconMoon className="ic-moon" width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileMenu({ user, logout, t }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function onDocumentClick(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    }
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  return (
    <div className={`profile-menu${profileOpen ? " open" : ""}`} ref={profileRef}>
      <button
        className="profile-toggle"
        aria-label={t("Open profile menu", "የመገለጫ ምናሌ ክፈት")}
        aria-expanded={profileOpen}
        onClick={() => setProfileOpen((value) => !value)}
      >
        <IconUser width={19} height={19} />
      </button>
      <div className="profile-dropdown">
        <span className="profile-name">{user.name}</span>
        <button className="profile-logout" onClick={logout}>{t("Log Out", "ውጣ")}</button>
      </div>
    </div>
  );
}

function Header() {
  const { t, user, logout } = useApp();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const ddRef = useRef(null);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    async function loadAnnouncementCount() {
      try {
        const response = await fetch(`${API_URL}/api/announcements`);
        if (!response.ok) return;
        const data = await response.json();
        setAnnouncementCount(Array.isArray(data) ? data.length : 0);
      } catch {
        setAnnouncementCount(0);
      }
    }

    loadAnnouncementCount();
  }, []);

  useEffect(() => {
    setNavOpen(false);
    setDdOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onDocClick(e) {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const isServicesArea = ["/services", "/report", "/administrators"].includes(location.pathname);
  const closeNav = () => setNavOpen(false);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav">
        <Link to="/" className="brand">
          <span className="seal"><SealBrand /></span>
          <span className="brand-text">
            <span className="am">የሀድያ ዞን ፐብሊክ ሰርቪስና የሰዉ ኃብት ልማት መምሪያ</span>
            <span className="en">Hadiya Zone Public Service &amp; HR Development</span>
          </span>
        </Link>

        <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={navOpen} onClick={() => setNavOpen((v) => !v)}>
          <IconMenu width={26} height={26} />
        </button>

        {navOpen && <button type="button" className="mobile-nav-backdrop" aria-label="Close navigation" onClick={closeNav} />}

        <nav className={`nav-links${navOpen ? " open" : ""}`} aria-label="Main navigation">
          <div className="mobile-nav-header">
            <span className="mobile-nav-title">Menu</span>
            <button type="button" className="mobile-nav-close" aria-label="Close menu" onClick={closeNav}>×</button>
          </div>

          <NavLink to="/" end className={({ isActive }) => (isActive ? "current" : "")} onClick={closeNav}>
            <span className="nav-item-icon" aria-hidden="true">⌂</span>
            <span className="nav-item-label">{t("Home", "መነሻ")}</span>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "current" : "")} onClick={closeNav}>
            <span className="nav-item-icon" aria-hidden="true">ℹ</span>
            <span className="nav-item-label">{t("About", "ስለ እኛ")}</span>
          </NavLink>
          <NavLink to="/announcements" className={({ isActive }) => (isActive ? "current" : "")} onClick={closeNav}>
            <span className="nav-item-icon" aria-hidden="true">📣</span>
            <span className="nav-item-label">{t("Announcements", "ማስታወቂያዎች")}</span>
            {announcementCount > 0 && <span className="nav-item-badge">{announcementCount}</span>}
          </NavLink>

          <div className={`nav-dropdown${ddOpen ? " open" : ""}`} ref={ddRef}>
            <Link to="/services" className={`nav-dropdown-link${isServicesArea ? " current" : ""}`} onClick={closeNav}>
              <span className="nav-item-icon" aria-hidden="true">▣</span>
              <span className="nav-item-label">{t("Services", "አገልግሎቶች")}</span>
            </Link>
            <button
              className="nav-dropdown-toggle"
              aria-label="Show services menu"
              aria-expanded={ddOpen}
              onClick={(e) => { e.stopPropagation(); setDdOpen((v) => !v); }}
            >
              <IconChevronDown width={15} height={15} />
            </button>
            <div className="nav-dropdown-menu">
              <Link to="/report" className={location.pathname === "/report" ? "current" : ""} onClick={closeNav}>
                <IconFileReport width={19} height={19} />
                <span>
                  <span className="dd-title">{t("Report Submission", "ሪፖርት ማስገቢያ")}</span>
                  <span className="dd-sub">{t("Submit a weekly or monthly report", "ሳምንታዊ ወይም ወርሃዊ ሪፖርት ያስገቡ")}</span>
                </span>
              </Link>
              <Link to="/administrators" className={location.pathname === "/administrators" ? "current" : ""} onClick={closeNav}>
                <IconUsers width={19} height={19} />
                <span>
                  <span className="dd-title">{t("Administrators", "አስተዳዳሪዎች")}</span>
                  <span className="dd-sub">{t("Find and contact the right official", "ትክክለኛውን ኃላፊ ያግኙ")}</span>
                </span>
              </Link>
            </div>
          </div>

          <NavLink to="/contact" className={({ isActive }) => (isActive ? "current" : "")} onClick={closeNav}>
            <span className="nav-item-icon" aria-hidden="true">✉</span>
            <span className="nav-item-label">{t("Contact", "አግኙን")}</span>
          </NavLink>

          {user?.role === "ADMIN" && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? "current" : "")} onClick={closeNav}>
              <span className="nav-item-icon" aria-hidden="true">⚙</span>
              <span className="nav-item-label">{t("Admin", "አስተዳዳሪ")}</span>
            </NavLink>
          )}

          <div className="mobile-nav-actions">
            {user ? (
              <ProfileMenu user={user} logout={logout} t={t} />
            ) : (
              <Link to="/login" className="nav-cta" onClick={closeNav}>
                <IconUsers width={16} height={16} />
                <span>{t("Log In", "ግባ")}</span>
              </Link>
            )}
            <HeaderControls />
          </div>
        </nav>
        <div className="nav-account">
          {user ? (
            <ProfileMenu user={user} logout={logout} t={t} />
          ) : (
            <Link to="/login" className="nav-cta">
              <IconUsers width={16} height={16} />
              <span>{t("Log In", "ግባ")}</span>
            </Link>
          )}
          <HeaderControls />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useApp();
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="seal"><SealFooter /></span>
            <div>
              <div className="am">የሀድያ ዞን ፐብሊክ ሰርቪስና የሰዉ ኃብት ልማት መምሪያ</div>
              <div className="en">Central Ethiopia Regional State</div>
            </div>
          </div>

          <div className="footer-col">
            <h5>{t("Navigate", "ማውጫ")}</h5>
            <ul>
              <li><Link to="/">{t("Home", "መነሻ")}</Link></li>
              <li><Link to="/about">{t("About", "ስለ እኛ")}</Link></li>
              <li><Link to="/services">{t("Services", "አገልግሎቶች")}</Link></li>
              <li><Link to="/contact">{t("Contact", "አግኙን")}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>{t("Services", "አገልግሎቶች")}</h5>
            <ul>
              <li><Link to="/report">{t("Report Submission", "ሪፖርት ማስገቢያ")}</Link></li>
              <li><Link to="/administrators">{t("Leadership Directory", "የአመራር ዝርዝር")}</Link></li>
              <li><Link to="/login">{t("Log In", "ግባ")}</Link></li>
              <li><Link to="/contact">{t("Contact Us", "አግኙን")}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>{t("Reach Us", "አድራሻ")}</h5>
            <ul>
              <li><span><IconPin width={14} height={14} /> {t("Hosaena, Hadiya Zone, Central Ethiopia Regional State, Ethiopia", "ሆሳዕና፣ የሀድያ ዞን፣ ማዕከላዊ ኢትዮጵያ ክልላዊ መንግስት፣ ኢትዮጵያ")}</span></li>
              <li><span><IconMail width={14} height={14} /> hzpsd.hr@ethiopia.gov.et</span></li>
              <li><span><IconPhone width={14} height={14} /> +251 46 XXX XXXX</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t(
            "© 2026 Hadiya Zone Public Service & Human Resource Development Department. All rights reserved.",
            "© 2026 የሀድያ ዞን ፐብሊክ ሰርቪስና የሰዉ ኃብት ልማት መምሪያ። መብቱ በህግ የተጠበቀ ነው።"
          )}</span>
          <span>{t("Prototype build — connect a backend to go live", "ናሙና ገጽ — ወደ ስራ ለማስገባት ባክኤንድ ማስተሳሰር ያስፈልጋል")}</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
