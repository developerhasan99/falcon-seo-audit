import "../css/tailwind.css"; // Import Tailwind styles
import "react-toastify/ReactToastify.min.css";

// import Report from "./pages/report";
// import Audit from "./pages/audit";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Details from "./pages/details/details";
import Header from "./components/header";
import ReactDOM from "react-dom/client";
import RecentReports from "./pages/recent-reports/recent-reports";
import RunAudit from "./pages/run-audit/run-audit";
import SingleAuditReport from "./pages/single-audit-report/single-audit-report";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <HashRouter>
      <Header />
      <div className="px-4">
        <div className="max-w-screen-xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/reports" replace />} />
            <Route path="/reports" element={<RecentReports />} />
            <Route path="/reports/:id" element={<SingleAuditReport />} />
            <Route path="/run-audit" element={<RunAudit />} />
            <Route path="/details/:id" element={<Details />} />
            {/* <Route path="*" element={<Navigate to="/report" replace />} /> */}
          </Routes>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </HashRouter>
  );
};

// Render audit report page
const dashboardPageContainer = document.getElementById("fsa-main-page");

if (dashboardPageContainer) {
  const root = ReactDOM.createRoot(dashboardPageContainer);
  root.render(<App />);
}

// // Render run audit page
// const auditPageContainer = document.getElementById("fsa-run-audit-page");

// if (auditPageContainer) {
//   const root = ReactDOM.createRoot(auditPageContainer);
//   root.render(<Audit />);
// }
