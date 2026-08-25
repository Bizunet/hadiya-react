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

  useEffect(() => {
    if (user?.role !== "ADMIN") return;
    Promise.all([
      fetch(`${API_URL}/api/administrators`).then((response) => response.json()),
      fetch(`${API_URL}/api/announcements`).then((response) => response.json()),
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

  if (user?.role !== "ADMIN") {
    return <section><div className="wrap"><div className="card"><h3>Administrator access required</h3><p className="sub">Sign in with an administrator account to manage this site.</p></div></div></section>;
  }

  return (
    <section>
      <div className="wrap">
        <div className="section-head"><span className="eyebrow">Administration</span><h2>Site Control</h2></div>
        {status && <div className="notice" style={{ marginBottom: 20 }}>{status}</div>}
        <div className="card form-card" style={{ marginBottom: 24 }}>
          <h3>Publish Announcement</h3>
          <form onSubmit={createAnnouncement}>
            <div className="field"><label>Title</label><input value={title} onChange={(event) => setTitle(event.target.value)} required /></div>
            <div className="field"><label>Announcement</label><textarea value={body} onChange={(event) => setBody(event.target.value)} required /></div>
            <button className="btn btn-deep" type="submit">Publish</button>
          </form>
          {announcements.map((announcement) => <article className="card" key={announcement.id} style={{ marginTop: 16 }}><h4>{announcement.title}</h4><p>{announcement.body}</p></article>)}
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
      </div>
    </section>
  );
}
