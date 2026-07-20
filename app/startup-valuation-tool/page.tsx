import type { Metadata } from "next";
import "./tool.css";
import ValuationTool from "./ValuationTool";

export const metadata: Metadata = {
  title: "Startup Valuation Tool · Young Ventures",
  description:
    "Estimate a startup's pre-money valuation with the Venture Capital method.",
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
