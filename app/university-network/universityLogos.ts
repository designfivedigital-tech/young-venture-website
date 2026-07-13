export type FloatingLogo = {
  name: string;
  src: string;
  left: string;
  top: string;
  width: string;
  duration: string;
  delay: string;
};

const LOGO_SRC: Record<string, string> = {
  caltech: "/images/university-logos/caltech-university.png",
  harvard: "/images/university-logos/harvard-university.png",
  eth: "/images/university-logos/eth.zurich-university.png",
  cambridge: "/images/university-logos/cambridge-university.png",
  stanford: "/images/university-logos/standford-university.png",
  bocconi: "/images/university-logos/bocconi-university.png",
  lse: "/images/university-logos/lse-university.png",
  nyu: "/images/university-logos/nyu.png",
  oxford: "/images/university-logos/oxford-university.png",
};

export const VENN_LOGOS: FloatingLogo[] = [
  { name: "Caltech", src: LOGO_SRC.caltech, left: "20%", top: "16%", width: "10.0%", duration: "4.2s", delay: "0.0s" },
  { name: "Harvard", src: LOGO_SRC.harvard, left: "28%", top: "44%", width: "11.0%", duration: "5.1s", delay: "0.8s" },
  { name: "ETH Zürich", src: LOGO_SRC.eth, left: "18%", top: "72%", width: "11.0%", duration: "4.6s", delay: "1.5s" },
  { name: "Cambridge", src: LOGO_SRC.cambridge, left: "6%", top: "44%", width: "11.0%", duration: "5.4s", delay: "0.4s" },
  { name: "Stanford", src: LOGO_SRC.stanford, left: "46%", top: "42%", width: "8.0%", duration: "4.8s", delay: "1.1s" },
  { name: "Bocconi", src: LOGO_SRC.bocconi, left: "66%", top: "16%", width: "11.0%", duration: "5.0s", delay: "0.6s" },
  { name: "LSE", src: LOGO_SRC.lse, left: "83%", top: "44%", width: "10.0%", duration: "4.4s", delay: "1.8s" },
  { name: "NYU", src: LOGO_SRC.nyu, left: "63%", top: "72%", width: "9.5%", duration: "5.6s", delay: "0.2s" },
  { name: "Oxford", src: LOGO_SRC.oxford, left: "62%", top: "44%", width: "10.5%", duration: "4.9s", delay: "1.3s" },
];

export const POLES_LOGOS: FloatingLogo[] = [
  { name: "Caltech", src: LOGO_SRC.caltech, left: "6%", top: "22%", width: "10.5%", duration: "4.2s", delay: "0.0s" },
  { name: "ETH Zürich", src: LOGO_SRC.eth, left: "4%", top: "58%", width: "11.0%", duration: "4.6s", delay: "1.5s" },
  { name: "Harvard", src: LOGO_SRC.harvard, left: "14%", top: "76%", width: "11.0%", duration: "5.1s", delay: "0.8s" },
  { name: "Cambridge", src: LOGO_SRC.cambridge, left: "16%", top: "40%", width: "11.5%", duration: "5.4s", delay: "0.4s" },
  { name: "Bocconi", src: LOGO_SRC.bocconi, left: "84%", top: "24%", width: "11.0%", duration: "5.0s", delay: "0.6s" },
  { name: "LSE", src: LOGO_SRC.lse, left: "86%", top: "60%", width: "10.0%", duration: "4.4s", delay: "1.8s" },
  { name: "NYU", src: LOGO_SRC.nyu, left: "74%", top: "76%", width: "9.5%", duration: "5.6s", delay: "0.2s" },
  { name: "Oxford", src: LOGO_SRC.oxford, left: "72%", top: "40%", width: "10.5%", duration: "4.9s", delay: "1.3s" },
  { name: "Stanford", src: LOGO_SRC.stanford, left: "44.5%", top: "36%", width: "11%", duration: "4.8s", delay: "1.1s" },
];
