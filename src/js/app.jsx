import ReactDOM from "react-dom/client";
import "../css/tailwind.css"; // Import Tailwind styles

import Dashboard from "./pages/dashboard";
import Audit from "./pages/audit";

const dashboardPageContainer = document.getElementById(
  "falcon-seo-audit-admin"
);
const auditPageContainer = document.getElementById(
  "falcon-seo-audit-run-audit"
);

if (dashboardPageContainer) {
  const root = ReactDOM.createRoot(dashboardPageContainer);
  root.render(<Dashboard />);
}
if (auditPageContainer) {
  const root = ReactDOM.createRoot(auditPageContainer);
  root.render(<Audit />);
}
