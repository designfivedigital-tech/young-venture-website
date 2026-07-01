import {
  AtomIcon,
  BulbIcon,
  CpuIcon,
  DnaIcon,
  LeafIcon,
  NetworkIcon,
  RocketIcon,
} from "./focusAreaIcons";

export const FOCUS_ITEMS = [
  {
    id: 1,
    label: "Digital and frontier technologies",
    title: "Digital and frontier technologies",
    description:
      "We look for founders building at the edge of software, data, infrastructure and frontier computation.",
    link: "/focus/digital-frontier",
    Icon: CpuIcon,
    bg: "linear-gradient(135deg,#0a1a3f,#1e3a6e)",
    image: null as string | null,
  },
  {
    id: 2,
    label: "Scientific intelligence",
    title: "Scientific intelligence",
    description:
      "We back ideas where research, creativity and technical insight become new products, systems and markets.",
    link: "/focus/scientific-intelligence",
    Icon: BulbIcon,
    bg: "linear-gradient(135deg,#2b1a4f,#5b3fb0)",
    image: null as string | null,
  },
  {
    id: 3,
    label: "Sustainability and advanced industries",
    title: "Sustainability and advanced industries",
    description:
      "We invest in technologies transforming energy, climate, manufacturing and industrial resilience through breakthrough engineering.",
    link: "/focus/sustainability",
    Icon: LeafIcon,
    bg: "linear-gradient(135deg,#0e3a1f,#2f9e4f)",
    image: null as string | null,
  },
  {
    id: 4,
    label: "Human augmentation and advanced materials",
    title: "Human augmentation and advanced materials",
    description:
      "We explore the intersection of materials, biology, computation and human capability to unlock new physical possibilities.",
    link: "/focus/advanced-materials",
    Icon: NetworkIcon,
    bg: "linear-gradient(135deg,#3a0e3a,#a01f7e)",
    image: null as string | null,
  },
  {
    id: 5,
    label: "Space, mobility and new infrastructure",
    title: "Space, mobility and new infrastructure",
    description:
      "We support ambitious builders rethinking movement, logistics, aerospace and the infrastructure behind tomorrow’s systems.",
    link: "/focus/space-mobility",
    Icon: RocketIcon,
    bg: "linear-gradient(135deg,#0a2a3f,#1f8ea0)",
    image: null as string | null,
  },
  {
    id: 6,
    label: "Robotics and industrial automation",
    title: "Robotics and industrial automation",
    description:
      "We believe automation will reshape how the world builds, moves, produces and maintains complex environments.",
    link: "/focus/robotics",
    Icon: AtomIcon,
    bg: "linear-gradient(135deg,#3f1a0e,#c0562e)",
    image: null as string | null,
  },
  {
    id: 7,
    label: "Computational biology and life sciences",
    title: "Computational biology and life sciences",
    description:
      "We look for teams using computation, biology and engineering to create new tools for health, food and life sciences.",
    link: "/focus/computational-biology",
    Icon: DnaIcon,
    bg: "linear-gradient(135deg,#0e2f3f,#19a3c3)",
    image: null as string | null,
  },
];