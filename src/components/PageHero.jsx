import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SealWatermark } from "./Seal";

/**
 * crumbs: array of { to, label } for the breadcrumb trail (last item has no `to`)
 */
export default function PageHero({ amLine, en, p, crumbs = [] }) {
  const { t } = useApp();
  return (
    <section className="page-hero" style={{ backgroundImage: "url('assets/hero-crowd.jpg')" }}>
      <SealWatermark style={{ "--sz": "260px", width: 260, height: 260, right: -50, bottom: -70, opacity: 0.12, zIndex: 1, animation: "rotateSlow 90s linear infinite" }} />
      <div className="wrap">
        <div className="breadcrumb">
          <Link to="/">{t("Home", "መነሻ")}</Link>
          {crumbs.map((c, i) =>
            c.to ? (
              <span key={i}> / <Link to={c.to}>{t(c.en, c.am)}</Link></span>
            ) : (
              <span key={i}> / <span>{t(c.en, c.am)}</span></span>
            )
          )}
        </div>
        <h1><span className="am-line">{amLine}</span><span>{en}</span></h1>
        <p>{p}</p>
      </div>
    </section>
  );
}
