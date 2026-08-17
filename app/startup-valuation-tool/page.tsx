import type { Metadata } from "next";
import "./tool.css";
import ValuationTool from "./ValuationTool";

export const metadata: Metadata = {
  title: "Free Startup Valuation Tool (VC Method) | Young Ventures",
  description:
    "Free startup valuation calculator using the VC method: project EBITDA,",
};

export default function StartupValuationToolPage() {
  return (
    <div className="svt-tool">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <ValuationTool />
    </div>
  );
}
