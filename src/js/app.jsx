import "../css/tailwind.css"; // Import Tailwind styles
import "react-toastify/ReactToastify.min.css";

// import Report from "./pages/report";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";

// Components
import Header from "./components/header";
import Sidebar from "./components/sidebar";

// Pages
// import Issues from "./pages/issues/issues";
import Details from "./pages/details/details";
import RecentReports from "./pages/recent-reports/recent-reports";
import RunAudit from "./pages/run-audit/run-audit";
import SingleAuditReport from "./pages/single-audit-report/single-audit-report";
import Dashboard from "./pages/dashboard/dashboard";
import CrawledUrls from "./pages/crawled-urls/crawled-urls";
import SeoIssues from "./pages/seo-issues/seo-issues";
import PageSpeed from "./pages/page-speed";
import MobileUsability from "./pages/mobile-usability";
import Backlinks from "./pages/backlinks";
import ContentAnalysis from "./pages/content-analysis";
import TechnicalSeo from "./pages/technical-seo";

const App = () => {
  return (
    <HashRouter>
      <Sidebar />
      <div className="pl-64">
        <Header />
        <div className="px-6 max-w-screen-xl mx-auto pb-12">
          <Routes>
            {/* Run Audit */}
            <Route path="/run-audit" element={<RunAudit />} />
            {/* Sidebar Navigation */}
            <Route path="/crawled-urls" element={<CrawledUrls />} />
            <Route path="/seo-issues" element={<SeoIssues />} />
            <Route path="/page-speed" element={<PageSpeed />} />
            <Route path="/mobile-usability" element={<MobileUsability />} />
            <Route path="/backlinks" element={<Backlinks />} />
            <Route path="/content-analysis" element={<ContentAnalysis />} />
            <Route path="/technical-seo" element={<TechnicalSeo />} />
            <Route path="/" element={<Dashboard />} />
            {/* Details */}
            <Route path="/details/:id" element={<Details />} />
            {/* Reports */}
            <Route path="/reports" element={<RecentReports />} />
            <Route path="/reports/:id" element={<SingleAuditReport />} />
            {/* Fallback route */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
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
