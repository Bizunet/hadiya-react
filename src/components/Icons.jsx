/* Shared stroke-style icons (feather-inspired), kept as simple functions
   so components stay readable without a dependency on an icon package. */

const base = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export const IconPhone = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
export const IconMail = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M22 6l-10 7L2 6" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
);
export const IconPin = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const IconClock = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
export const IconFile = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
);
export const IconFileReport = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
);
export const IconUpload = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
);
export const IconUsers = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
export const IconUser = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
);
export const IconSettings = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.42 1.42-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2v-.48a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.42-1.42.06-.06A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.56-1.03H7v-2h.84A1.7 1.7 0 0 0 9.4 11a1.7 1.7 0 0 0-.34-1.88L9 9.06l1.42-1.42.06.06A1.7 1.7 0 0 0 12.36 8.04 1.7 1.7 0 0 0 13.39 6.48V6h2v.48a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.42 1.42-.06.06A1.7 1.7 0 0 0 19.4 11a1.7 1.7 0 0 0 1.56 1.03H21v2h-.04A1.7 1.7 0 0 0 19.4 15z" /></svg>
);
export const IconChevronDown = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.4} {...p}><polyline points="6 9 12 15 18 9" /></svg>
);
export const IconArrowRight = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
export const IconCheck = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.5} {...p}><polyline points="20 6 9 17 4 12" /></svg>
);
export const IconLock = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
export const IconMenu = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
);
export const IconSun = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="4" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
);
export const IconMoon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
);
export const IconSearch = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
);
export const IconInfo = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
);
export const IconTarget = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
);
export const IconEye = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const IconEyeOff = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M3 3l18 18" /><path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" /><path d="M9.88 5.09A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-3.16 4.19" /><path d="M6.61 6.61C3.77 8.35 1 12 1 12s4 8 11 8a10.94 10.94 0 0 0 4.12-.8" /></svg>
);
export const IconStar = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 2 L14.5 8.5 L21 9 L16 13.5 L17.5 20 L12 16.5 L6.5 20 L8 13.5 L3 9 L9.5 8.5 Z" /></svg>
);
export const IconHeart = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
);
export const IconBadge = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 14.6 6.9 18.2l1.9-5.8L4 8.8h6.1z" /></svg>
);
export const IconInfoCircle = IconInfo;
export const IconShieldCheck = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
export const IconGauge = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
);
export const IconBuilding = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><rect x="4" y="2" width="16" height="20" rx="1" /><line x1="9" y1="8" x2="9" y2="8" /><line x1="9" y1="12" x2="9" y2="12" /><line x1="9" y1="16" x2="9" y2="16" /><line x1="15" y1="8" x2="15" y2="8" /><line x1="15" y1="12" x2="15" y2="12" /><line x1="15" y1="16" x2="15" y2="16" /></svg>
);
export const IconClipboard = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="15" y2="16" /></svg>
);
export const IconRefresh = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
);
export const IconBarChart = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
);
export const IconDatabase = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
);
export const IconGender = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="10" cy="14" r="6" /><path d="M19 5l-5.4 5.4" /><path d="M19 5h-4" /><path d="M19 5v4" /></svg>
);
export const IconScale = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><line x1="12" y1="3" x2="12" y2="21" /><path d="M5 8l-3 6a3 3 0 0 0 6 0z" /><path d="M19 8l-3 6a3 3 0 0 0 6 0z" /><path d="M5 8h14" /><line x1="9" y1="21" x2="15" y2="21" /></svg>
);
export const IconRibbon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="8" r="6" /><path d="M9 14l-3 8 6-3 6 3-3-8" /></svg>
);
