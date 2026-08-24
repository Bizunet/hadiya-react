import {
  IconRefresh, IconShieldCheck, IconUsers, IconGauge, IconDatabase,
  IconBuilding, IconGender, IconBarChart, IconRibbon, IconScale,
} from "./Icons";

const MAP = {
  refresh: IconRefresh,
  shield: IconShieldCheck,
  users: IconUsers,
  gauge: IconGauge,
  database: IconDatabase,
  building: IconBuilding,
  gender: IconGender,
  chart: IconBarChart,
  ribbon: IconRibbon,
  scale: IconScale,
};

export default function TeamIcon({ name, ...rest }) {
  const Cmp = MAP[name] || IconUsers;
  return <Cmp {...rest} />;
}
