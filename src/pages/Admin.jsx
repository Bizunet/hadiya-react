import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Admin() {
  const { user } = useApp();
  const [administrators, setAdministrators] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");
  const [slides, setSlides] = useState([]);
  const [slideForm, setSlideForm] = useState({ captionEn: "", captionAm: "", order: 0, linkTo: "", isActive: true });
  const [slideImage, setSlideImage] = useState(null);
  const [editingSlide, setEditingSlide] = useState(null);
  const [adminTab, setAdminTab] = useState("overview");
  const [reports, setReports] = useState([]);
  const [messages, setMessages] = useState([]);
  const [managementLoading, setManagementLoading] = useState(false);
  const [managementError, setManagementError] = useState("");
  const [reportSearch, setReportSearch] = useState("");
  const [reportTypeFilter, setReportTypeFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const authHeaders = { Authorization: `Bearer ${localStorage.getItem("authToken") || ""}` };

  function loadStats() {
    setStatsLoading(true);
    setStatsError("");
    return fetch(`${API_URL}/api/stats/admin`, { headers: authHeaders })
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, data }) => {
        if (!response.ok) throw new Error(data.message || "Unable to load statistics");
        setStats(data);
      })
      .catch((error) => setStatsError(error.message))
      .finally(() => setStatsLoading(false));
  }

  function loadSlides() {
    return fetch(`${API_URL}/api/slides`)
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, data }) => {
        if (!response.ok) throw new Error(data.message || "Unable to load slides");
        setSlides(Array.isArray(data) ? data : []);
      });
  }

  async function loadManagement(tab) {
    setManagementLoading(true); setManagementError("");
    try {
      const endpoint = tab === "reports" ? "/api/reports/admin" : "/api/contact/admin";
      const response = await fetch(`${API_URL}${endpoint}`, { headers: authHeaders });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load management data");
      tab === "reports" ? setReports(data) : setMessages(data);
    } catch (error) { setManagementError(error.message); }
    finally { setManagementLoading(false); }
  }

  useEffect(() => {
    if (user?.role === "ADMIN" && adminTab !== "overview") loadManagement(adminTab);
  }, [adminTab, user]);

  async function updateReportStatus(report, nextStatus) {
    const response = await fetch(`${API_URL}/api/reports/admin/${report.id}/status`, { method: "PATCH", headers: { ...authHeaders, "Content-Type": "application/json" }, body: JSON.stringify({ status: nextStatus }) });
    if (response.ok) setReports((items) => items.map((item) => item.id === report.id ? { ...item, status: nextStatus } : item));
    else setManagementError("Unable to update report status");
  }

  async function downloadReportFile(file) {
    try {
      const response = await fetch(`${API_URL}/api/reports/admin/files/${file.id}/download`, { headers: authHeaders });

      const contentType = response.headers.get("content-type") || "";
      const disposition = response.headers.get("content-disposition") || "";

      if (response.ok && (contentType.startsWith("application/") || disposition.includes("attachment"))) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        const fileName = (() => {
          const match = disposition.match(/filename\*?=(?:UTF-8'')?([^;]+)/i);
          return match ? decodeURIComponent(match[1].replace(/['"]/g, "")) : (file.originalName || "report-file");
        })();

        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        return;
      }

      const data = await response.json().catch(() => ({}));
      if (response.ok && data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
        return;
      }

      setManagementError(data.message || "Unable to download file");
    } catch (error) {
      setManagementError(error.message || "Unable to prepare download");
    }
  }

  async function markMessageRead(message) {
    if (message.isRead) return;
    const response = await fetch(`${API_URL}/api/contact/admin/${message.id}/read`, { method: "PATCH", headers: authHeaders });
    if (response.ok) setMessages((items) => items.map((item) => item.id === message.id ? { ...item, isRead: true } : item));
  }

  async function deleteMessage(message) {
    if (!window.confirm("Delete this message?")) return;
    const response = await fetch(`${API_URL}/api/contact/admin/${message.id}`, { method: "DELETE", headers: authHeaders });
    if (response.ok) setMessages((items) => items.filter((item) => item.id !== message.id));
  }

  useEffect(() => {
    if (user?.role !== "ADMIN") return;
    Promise.all([
      fetch(`${API_URL}/api/administrators`).then((response) => response.json()),
      fetch(`${API_URL}/api/announcements`).then((response) => response.json()),
      loadSlides(),
      loadStats(),
    ]).then(([adminData, announcementData]) => {
      setAdministrators(adminData);
      setAnnouncements(announcementData);
    }).catch(() => setStatus("Unable to load admin data"));
  }, [user]);

  async function updateAdministrator(administrator, event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`${API_URL}/api/administrators/${administrator.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken") || ""}` },
      body: formData,
    });
    setStatus(response.ok ? "Administrator updated" : "Unable to update administrator");
  }

  async function createAnnouncement(event) {
    event.preventDefault();
    const response = await fetch(`${API_URL}/api/announcements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      },
      body: JSON.stringify({ title, body }),
    });
    if (response.ok) {
      const announcement = await response.json();
      setAnnouncements((current) => [announcement, ...current]);
      setTitle("");
      setBody("");
      setStatus("Announcement published");
    } else {
      setStatus("Unable to publish announcement");
    }
  }

  function updateSlideField(field, value) {
    setSlideForm((current) => ({ ...current, [field]: value }));
  }

  function startEditingSlide(slide) {
    setEditingSlide(slide);
    setSlideForm({
      captionEn: slide.captionEn || "",
      captionAm: slide.captionAm || "",
      order: slide.order ?? 0,
      linkTo: slide.linkTo || "",
      isActive: slide.isActive !== false,
    });
    setSlideImage(null);
  }

  function resetSlideForm() {
    setEditingSlide(null);
    setSlideForm({ captionEn: "", captionAm: "", order: 0, linkTo: "", isActive: true });
    setSlideImage(null);
  }

  async function saveSlide(event) {
    event.preventDefault();
    const formData = new FormData();
    const image = event.currentTarget.elements.image.files[0];
    if (!editingSlide && !image) {
      setStatus(t("Please choose a JPG or PNG image", "እባክዎ የJPG ወይም PNG ምስል ይምረጡ"));
      return;
    }
    if (image) formData.append("image", image);
    formData.append("captionEn", slideForm.captionEn);
    formData.append("captionAm", slideForm.captionAm);
    formData.append("order", String(slideForm.order));
    formData.append("linkTo", slideForm.linkTo);
    formData.append("isActive", String(slideForm.isActive));

    const endpoint = editingSlide ? `${API_URL}/api/slides/${editingSlide.id}` : `${API_URL}/api/slides`;
    const response = await fetch(endpoint, { method: editingSlide ? "PUT" : "POST", headers: authHeaders, body: formData });
    if (response.ok) {
      const slide = await response.json();
      setSlides((current) => editingSlide ? current.map((item) => item.id === slide.id ? slide : item) : [...current, slide].sort((a, b) => a.order - b.order));
      setStatus(editingSlide ? t("Slide updated", "ስላይዱ ተዘምኗል") : t("Slide added", "ስላይድ ተጨምሯል"));
      resetSlideForm();
    } else {
      const data = await response.json().catch(() => ({}));
      setStatus(data.message || (editingSlide ? "Unable to update slide" : "Unable to add slide"));
    }
  }

  async function deleteSlide(slide) {
    if (!window.confirm(t("Delete this slide?", "ይህ ስላይድ ይሰረዝ?"))) return;
    const response = await fetch(`${API_URL}/api/slides/${slide.id}`, { method: "DELETE", headers: authHeaders });
    if (response.ok) {
      setSlides((current) => current.filter((item) => item.id !== slide.id));
      setStatus(t("Slide deleted", "ስላይዱ ተሰርዟል"));
      if (editingSlide?.id === slide.id) resetSlideForm();
    } else {
      setStatus("Unable to delete slide");
    }
  }

  const { t } = useApp();

  if (user?.role !== "ADMIN") {
    return <section><div className="wrap"><div className="card"><h3>Administrator access required</h3><p className="sub">Sign in with an administrator account to manage this site.</p></div></div></section>;
  }

  return (
    <section>
      <div className="wrap">
        <div className="section-head"><span className="eyebrow">{t("Administration", "አስተዳደር")}</span><h2>{t("Site Control", "የጣቢያ ቁጥጥር")}</h2></div>
        {status && <div className="notice" style={{ marginBottom: 20 }}>{status}</div>}
        <div className="admin-tabs" role="tablist">
          {[['overview', 'Overview'], ['reports', 'Reports Management'], ['messages', 'Contact Messages']].map(([value, label]) => <button key={value} type="button" role="tab" aria-selected={adminTab === value} className={adminTab === value ? "active" : ""} onClick={() => setAdminTab(value)}>{t(label, label)}</button>)}
        </div>
        {adminTab !== "overview" && (
          <div className="card admin-management-panel">
            <div className="section-head compact"><span className="eyebrow">{adminTab === "reports" ? t("Reports", "ሪፖርቶች") : t("Inbox", "የመልዕክት ሳጥን")}</span><h3>{adminTab === "reports" ? t("Reports Management", "የሪፖርት አስተዳደር") : t("Contact Messages", "የግንኙነት መልዕክቶች")}</h3></div>
            {adminTab === "reports" && <div className="admin-filters"><input placeholder="Search employee or office" value={reportSearch} onChange={(e) => setReportSearch(e.target.value)} /><select value={reportTypeFilter} onChange={(e) => setReportTypeFilter(e.target.value)}><option value="">All report types</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="custom">Custom</option></select></div>}
            {managementLoading && <p className="sub">Loading...</p>}
            {managementError && <div className="notice admin-error">{managementError}</div>}
            {!managementLoading && !managementError && adminTab === "reports" && <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Employee</th><th>Office</th><th>Type</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{reports.filter((report) => `${report.fullName} ${report.office}`.toLowerCase().includes(reportSearch.toLowerCase()) && (!reportTypeFilter || report.reportType === reportTypeFilter)).map((report) => <tr key={report.id}><td>{report.fullName}<small>{report.reference}</small></td><td>{report.office}</td><td>{report.reportType}</td><td>{new Date(report.createdAt).toLocaleDateString()}</td><td><select value={report.status || "Pending"} onChange={(e) => updateReportStatus(report, e.target.value)}><option>Pending</option><option>Reviewed</option><option>Approved</option></select></td><td><button className="btn btn-outline" type="button" onClick={() => setSelectedItem({ type: "report", item: report })}>View</button>{report.files.map((file) => <button className="btn btn-outline" type="button" key={file.id} onClick={() => downloadReportFile(file)}>Download</button>)}</td></tr>)}</tbody></table>{!reports.length && <p className="sub">No reports submitted yet.</p>}</div>}
            {!managementLoading && !managementError && adminTab === "messages" && <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Sender</th><th>Subject</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{messages.map((message) => <tr key={message.id}><td>{message.name}<small>{message.email}</small></td><td>{message.subject}</td><td>{new Date(message.createdAt).toLocaleDateString()}</td><td><span className={`message-status${message.isRead ? " read" : ""}`}>{message.isRead ? "Read" : "Unread"}</span></td><td><button className="btn btn-outline" type="button" onClick={() => { setSelectedItem({ type: "message", item: message }); markMessageRead(message); }}>Read</button>{!message.isRead && <button className="btn btn-outline" type="button" onClick={() => markMessageRead(message)}>Mark read</button>}<button className="btn btn-outline" type="button" onClick={() => deleteMessage(message)}>Delete</button></td></tr>)}</tbody></table>{!messages.length && <p className="sub">No contact messages yet.</p>}</div>}
          </div>
        )}
        {selectedItem && <div className="modal-backdrop" onClick={() => setSelectedItem(null)}><div className="modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" type="button" onClick={() => setSelectedItem(null)}>×</button><h2>{selectedItem.type === "report" ? selectedItem.item.reference : selectedItem.item.subject}</h2><div className="modal-copy">{selectedItem.type === "report" ? `Employee: ${selectedItem.item.fullName}\nOffice: ${selectedItem.item.office}\nPosition: ${selectedItem.item.position}\nPeriod: ${new Date(selectedItem.item.periodStart).toLocaleDateString()} - ${new Date(selectedItem.item.periodEnd).toLocaleDateString()}\n\n${selectedItem.item.notes || "No notes provided."}` : `${selectedItem.item.name} <${selectedItem.item.email}>\n\n${selectedItem.item.message}`}</div></div></div>}
        {adminTab === "overview" && <>
        <div className="card admin-stats-panel" style={{ marginBottom: 24 }}>
          <div className="section-head compact"><span className="eyebrow">{t("Overview", "አጠቃላይ እይታ")}</span><h3>{t("Dashboard Statistics", "የዳሽቦርድ ስታቲስቲክስ")}</h3></div>
          {statsLoading && <p className="sub">{t("Loading statistics...", "ስታቲስቲክስ በመጫን ላይ...")}</p>}
          {statsError && <div className="notice admin-error"><span>{statsError}</span><button className="btn btn-outline" type="button" onClick={loadStats}>{t("Try again", "እንደገና ይሞክሩ")}</button></div>}
          {stats && !statsLoading && !statsError && (
            <>
              <div className="stat-row admin-stat-row">
                {[
                  ["Total Reports", "ጠቅላላ ሪፖርቶች", stats.totalReports],
                  ["Total Employees", "ጠቅላላ ሰራተኞች", stats.totalEmployees],
                  ["Contact Messages", "የግንኙነት መልዕክቶች", stats.totalContactMessages],
                  ["Announcements", "ማስታወቂያዎች", stats.totalAnnouncements],
                  ["Last 30 Days", "ያለፉት 30 ቀናት", stats.reportsLast30Days],
                ].map(([en, am, value]) => <button type="button" className={`stat-cell${en === "Total Reports" || en === "Contact Messages" ? " stat-link" : ""}`} key={en} onClick={() => en === "Total Reports" ? setAdminTab("reports") : en === "Contact Messages" ? setAdminTab("messages") : undefined}><div className="n">{value}</div><div className="l">{t(en, am)}</div></button>)}
              </div>
              <div className="admin-breakdowns">
                <div><h4>{t("Reports by Type", "ሪፖርቶች በአይነት")}</h4>{stats.reportsByType.map((item) => <div className="admin-list-row" key={item.reportType}><span>{item.reportType}</span><strong>{item.count}</strong></div>)}</div>
                <div><h4>{t("Reports by Office", "ሪፖርቶች በጽሕፈት ቤት")}</h4>{stats.reportsByOffice.map((item) => <div className="admin-list-row" key={item.office}><span>{item.office}</span><strong>{item.count}</strong></div>)}</div>
              </div>
              <div className="admin-recent"><h4>{t("Recent Reports", "የቅርብ ጊዜ ሪፖርቶች")}</h4>{stats.recentReports.map((report) => <div className="admin-list-row" key={report.reference}><span><strong>{report.reference}</strong> {report.fullName} <small>{report.office}</small></span><time>{new Date(report.createdAt).toLocaleDateString()}</time></div>)}</div>
            </>
          )}
        </div>
        <div className="card form-card" style={{ marginBottom: 24 }}>
          <h3>{t("Publish Announcement", "ማስታወቂያ አትም")}</h3>
          <form onSubmit={createAnnouncement}>
            <div className="field"><label>Title</label><input value={title} onChange={(event) => setTitle(event.target.value)} required /></div>
            <div className="field"><label>Announcement</label><textarea value={body} onChange={(event) => setBody(event.target.value)} required /></div>
            <button className="btn btn-deep" type="submit">Publish</button>
          </form>
          {announcements.map((announcement) => <article className="card" key={announcement.id} style={{ marginTop: 16 }}><h4>{announcement.title}</h4><p>{announcement.body}</p></article>)}
        </div>
        <div className="card form-card" style={{ marginBottom: 24 }}>
          <div className="admin-section-title"><div><span className="eyebrow">{t("Homepage", "መነሻ ገጽ")}</span><h3>{t("Manage Home Slider", "የመነሻ ገጽ ስላይደር ያስተዳድሩ")}</h3></div></div>
          <form onSubmit={saveSlide}>
            <div className="field"><label>{t("Image", "ምስል")}</label><input name="image" type="file" accept="image/jpeg,image/png" onChange={(event) => setSlideImage(event.target.files[0] || null)} required={!editingSlide} /></div>
            <div className="field-row"><div className="field"><label>{t("Caption (EN)", "መግለጫ (እንግሊዝኛ)")}</label><input value={slideForm.captionEn} onChange={(event) => updateSlideField("captionEn", event.target.value)} /></div><div className="field"><label>{t("Caption (AM)", "መግለጫ (አማርኛ)")}</label><input value={slideForm.captionAm} onChange={(event) => updateSlideField("captionAm", event.target.value)} /></div></div>
            <div className="field-row"><div className="field"><label>{t("Order", "ተራ ቁጥር")}</label><input type="number" value={slideForm.order} onChange={(event) => updateSlideField("order", event.target.value)} /></div><div className="field"><label>{t("Link (optional)", "አገናኝ (አማራጭ)")}</label><input value={slideForm.linkTo} onChange={(event) => updateSlideField("linkTo", event.target.value)} /></div></div>
            <label className="checkbox-field"><input type="checkbox" checked={slideForm.isActive} onChange={(event) => updateSlideField("isActive", event.target.checked)} /> <span>{t("Active", "ንቁ")}</span></label>
            <div className="admin-actions"><button className="btn btn-deep" type="submit">{editingSlide ? t("Save Slide", "ስላይዱን አስቀምጥ") : t("Add Slide", "ስላይድ ጨምር")}</button>{editingSlide && <button className="btn btn-outline" type="button" onClick={resetSlideForm}>{t("Cancel", "ሰርዝ")}</button>}</div>
          </form>
          <div className="slide-admin-list">{slides.map((slide) => <article className="slide-admin-item" key={slide.id}><img src={slide.imageUrl || slide.photo || slide.imagePath} alt={slide.captionEn || t("Slider image", "የስላይደር ምስል")} /><div className="slide-admin-copy"><strong>{slide.captionEn || t("Untitled slide", "ስም የሌለው ስላይድ")}</strong><span>{t("Order", "ተራ ቁጥር")} {slide.order} · {slide.isActive ? t("Active", "ንቁ") : t("Inactive", "ንቁ ያልሆነ")}</span></div><div className="admin-actions"><button className="btn btn-outline" type="button" onClick={() => startEditingSlide(slide)}>{t("Edit", "አስተካክል")}</button><button className="btn btn-outline" type="button" onClick={() => deleteSlide(slide)}>{t("Delete", "ሰርዝ")}</button></div></article>)}</div>
        </div>
        <div className="admin-grid">
          {administrators.map((administrator) => (
            <form className="card" key={administrator.id} onSubmit={(event) => updateAdministrator(administrator, event)}>
              <h3>{administrator.nameEn}</h3>
              <div className="field"><label>English name</label><input name="nameEn" defaultValue={administrator.nameEn} required /></div>
              <div className="field"><label>Amharic name</label><input name="nameAm" defaultValue={administrator.nameAm} required /></div>
              <div className="field"><label>Phone</label><input name="phone" defaultValue={administrator.phone || ""} /></div>
              <div className="field"><label>Email</label><input name="email" type="email" defaultValue={administrator.email || ""} /></div>
              <div className="field"><label>Photo</label><input name="image" type="file" accept="image/jpeg,image/png" /></div>
              <button className="btn btn-outline" type="submit">Save changes</button>
            </form>
          ))}
        </div>
        </>}
      </div>
    </section>
  );
}
