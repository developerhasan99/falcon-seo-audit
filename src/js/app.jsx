import "../css/tailwind.css"; // Import Tailwind styles
import "react-toastify/ReactToastify.min.css";

import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Components
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Dashboard from "./pages/dashboard/dashboard";
import Details from "./pages/details/details";
import RunAudit from "./pages/run-audit/run-audit";
import CrawledUrls from "./pages/crawled-urls/crawled-urls";
import SeoIssues from "./pages/seo-issues/seo-issues";
import PageSpeed from "./pages/page-speed";
import MobileUsability from "./pages/mobile-usability";
import Backlinks from "./pages/backlinks";
import RecentReports from "./pages/recent-reports/recent-reports";
import SingleAuditReport from "./pages/single-audit-report/single-audit-report";
import ContentAnalysis from "./pages/content-analysis";
import TechnicalSeo from "./pages/technical-seo";
import AuthPage from "./pages/AuthPage";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Sidebar />}
      <div className={isAuthenticated ? "pl-64" : ""}>
        {isAuthenticated && <Header />}
        <div className="px-6 max-w-screen-xl mx-auto pb-12">
          <Routes>
            {/* Public route */}
            <Route path="/auth" element={isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />} />
            
            {/* Protected routes */}
            <Route path="/run-audit" element={
              <ProtectedRoute>
                <RunAudit />
              </ProtectedRoute>
            } />
            
            <Route path="/crawled-urls" element={
              <ProtectedRoute>
                <CrawledUrls />
              </ProtectedRoute>
            } />
            
            <Route path="/seo-issues" element={
              <ProtectedRoute>
                <SeoIssues />
              </ProtectedRoute>
            } />
            
            <Route path="/page-speed" element={
              <ProtectedRoute>
                <PageSpeed />
              </ProtectedRoute>
            } />
            
            <Route path="/mobile-usability" element={
              <ProtectedRoute>
                <MobileUsability />
              </ProtectedRoute>
            } />
            
            <Route path="/backlinks" element={
              <ProtectedRoute>
                <Backlinks />
              </ProtectedRoute>
            } />
            
            <Route path="/content-analysis" element={
              <ProtectedRoute>
                <ContentAnalysis />
              </ProtectedRoute>
            } />
            
            <Route path="/technical-seo" element={
              <ProtectedRoute>
                <TechnicalSeo />
              </ProtectedRoute>
            } />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/details/:id" element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute>
                <RecentReports />
              </ProtectedRoute>
            } />
            
            <Route path="/reports/:id" element={
              <ProtectedRoute>
                <SingleAuditReport />
              </ProtectedRoute>
            } />
            
            {/* Catch all other routes */}
            <Route path="*" element={
              isAuthenticated ? 
                <Navigate to="/" replace /> : 
                <Navigate to="/auth" replace state={{ from: window.location.pathname }} />
            } />
          </Routes>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
};

// Render audit report page
const dashboardPageContainer = document.getElementById("fsa-main-page");

if (dashboardPageContainer) {
  const root = ReactDOM.createRoot(dashboardPageContainer);
  root.render(<App />);
}
