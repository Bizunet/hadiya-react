export const LEADER = {
  nameAm: "አቶ ህንዴቦ ጋልቻሞ ጋዕኖሬ",
  nameEn: "Mr. Handebo Galichamo Gaenore",
  roleEn: "Head, Hadiya Zone Public Service & Human Resource Development Department",
  roleAm: "የሀድያ ዞን ፐብሊክ ሰርቪስና የሰዉ ሀብት ልማት መምርያ ሀላፊ",
  photo: "assets/admins/handebo.jpg",
  email: "galichamoh@gmail.com",
  phone: null,
};

export const ADMINS = [
  {
    key: "getachew", nameAm: "አቶ ጌታቸዉ ዋጡሞ ጋቦሬ", nameEn: "Mr. Getachew Watumo Gabore",
    roleEn: "Good Governance Affairs Team Leader", roleAm: "የመልካም አስተዳደር ጉዳዮች ቡድን መሪ",
    badgeEn: "Good Governance", badgeAm: "መልካም አስተዳደር", team: "governance",
    photo: "assets/admins/getachew.jpg", phone: "+251991326608", email: null,
  },
  {
    key: "tamrat", nameAm: "አቶ ታምራት አብቼ", nameEn: "Mr. Tamrat Abiche",
    roleEn: "Good Governance Affairs Expert", roleAm: "የመልካም አስተዳደር ጉዳዮች ቡድን ባለሙያ",
    badgeEn: "Good Governance", badgeAm: "መልካም አስተዳደር", team: "governance",
    photo: "assets/admins/tamrat.jpg", phone: "+251911540694", email: null,
  },
  {
    key: "tadese", nameAm: "አቶ ታደሰ ሻንቆ ጎዲሶ", nameEn: "Mr. Tadese Shanko Godiso",
    roleEn: "P/B/P/F Evaluation Team Leader", roleAm: "የዕ/በ/ዝ/ክ/ግምገማ ቡድን መሪ",
    badgeEn: "P/B/P/F Evaluation", badgeAm: "ዕ/በ/ዝ/ክ/ግምገማ", team: "evaluation",
    photo: "assets/admins/tadese.jpg", phone: null, email: "tadessegodiso@gmail.com",
  },
  {
    key: "dawit", nameAm: "አቶ ዳዊት ላቀዉ", nameEn: "Mr. Dawit Lakew",
    roleEn: "P/B/P/F Evaluation Team Expert", roleAm: "የዕ/በ/ዝ/ክ/ግምገማ ቡድን ባለሙያ",
    badgeEn: "P/B/P/F Evaluation", badgeAm: "ዕ/በ/ዝ/ክ/ግምገማ", team: "evaluation",
    photo: "assets/admins/dawit.jpg", phone: null, email: null,
  },
  {
    key: "liyuwerk", nameAm: "ወ/ሪት ልዩወርቅ መኩሪያ ጸሐይ", nameEn: "Ms. Liyuwerk Mekurya Tsehay",
    roleEn: "HIV/AIDS Affairs Expert", roleAm: "የኤች.አይ.ቪ.ኤዲስ ጉዳዮች ባለሙያ",
    badgeEn: "HIV/AIDS Affairs", badgeAm: "ኤች.አይ.ቪ.ኤዲስ", team: "hiv",
    photo: "assets/admins/liyuwerk.jpg", phone: "0912244854", email: null,
  },
  {
    key: "teshome", nameAm: "አቶ ተሾመ ታምሬ ባሶሬ", nameEn: "Mr. Teshome Tamire Basore",
    roleEn: "Human Resource Administration & Development Team Leader", roleAm: "የሰዉ ሀብት አስተዳደርና ልማት ቡድን መሪ",
    badgeEn: "Human Resources", badgeAm: "የሰዉ ሀብት", team: "hr",
    photo: "assets/admins/teshome.jpg", phone: "+251926494655", email: "Tamireteshome530@gmail.com",
  },
  {
    key: "kassahun", nameAm: "አቶ ካሳሁን ኤርማኮ", nameEn: "Mr. Kassahun Ermako",
    roleEn: "Human Resource Execution & Performance Team Leader", roleAm: "የሰዉ ሀብት ሥ/አፈ/ግ/ግ/ቡድን መሪ",
    badgeEn: "Human Resources", badgeAm: "የሰዉ ሀብት", team: "hr",
    photo: "assets/admins/kassahun.jpg", phone: "+251913747108", email: null,
  },
  {
    key: "girma", nameAm: "አቶ ግርማ መኔዶ", nameEn: "Mr. Girma Menedo",
    roleEn: "Reform Monitoring and Support Team", roleAm: "የሪፎርም ክትትልና ድጋፍ ቡድን",
    badgeEn: "Reform Monitoring", badgeAm: "ሪፎርም ክትትል", team: "reform",
    photo: "assets/admins/girma.jpg", phone: null, email: null,
  },
];

export const TEAM_FILTERS = [
  { value: "", en: "All Teams", am: "ሁሉም ቡድኖች" },
  { value: "governance", en: "Good Governance", am: "መልካም አስተዳደር" },
  { value: "evaluation", en: "P/B/P/F Evaluation", am: "የዕ/በ/ዝ/ክ/ግምገማ" },
  { value: "hiv", en: "HIV/AIDS Affairs", am: "ኤች.አይ.ቪ.ኤዲስ" },
  { value: "hr", en: "Human Resources", am: "የሰዉ ሀብት" },
  { value: "reform", en: "Reform Monitoring", am: "ሪፎርም ክትትል" },
];
