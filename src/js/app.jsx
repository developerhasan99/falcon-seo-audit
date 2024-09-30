import ReactDOM from "react-dom/client";
import "../css/tailwind.css"; // Import Tailwind styles

import Report from "./pages/report";
import Audit from "./pages/audit";

// Render run audit page
const auditPageContainer = document.getElementById("fsa-run-audit-page");

if (auditPageContainer) {
  const root = ReactDOM.createRoot(auditPageContainer);
  root.render(<Audit />);
}

// Render audit report page
const dashboardPageContainer = document.getElementById(
  "fsa-audit-report-page"
);

if (dashboardPageContainer) {
  const root = ReactDOM.createRoot(dashboardPageContainer);
  root.render(<Report />);
}
