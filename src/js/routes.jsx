import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/hooks/useAuth";

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
import ContentAnalysis from "./pages/content-analysis";
import TechnicalSeo from "./pages/technical-seo";
import AuthPage from "./pages/AuthPage";

const AppRoutes = () => {
  const { data: user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="*"
          element={<Navigate to="/auth" state={{ from: location }} replace />}
        />
      </Routes>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="md:pl-64">
        <Header />
        <div className="px-6 max-w-screen-xl mx-auto pb-12">
          <Routes>
            <Route
              path="/run-audit"
              element={
                <ProtectedRoute>
                  <RunAudit />
                </ProtectedRoute>
              }
            />

            <Route
              path="/crawled-urls"
              element={
                <ProtectedRoute>
                  <CrawledUrls />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seo-issues"
              element={
                <ProtectedRoute>
                  <SeoIssues />
                </ProtectedRoute>
              }
            />

            <Route
              path="/page-speed"
              element={
                <ProtectedRoute>
                  <PageSpeed />
                </ProtectedRoute>
              }
            />

            <Route
              path="/mobile-usability"
              element={
                <ProtectedRoute>
                  <MobileUsability />
                </ProtectedRoute>
              }
            />

            <Route
              path="/backlinks"
              element={
                <ProtectedRoute>
                  <Backlinks />
                </ProtectedRoute>
              }
            />

            <Route
              path="/content-analysis"
              element={
                <ProtectedRoute>
                  <ContentAnalysis />
                </ProtectedRoute>
              }
            />

            <Route
              path="/technical-seo"
              element={
                <ProtectedRoute>
                  <TechnicalSeo />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/details/:id"
              element={
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              }
            />
            {/* Catch all other routes */}
            <Route
              path="*"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate
                    to="/auth"
                    replace
                    state={{ from: location.pathname }}
                  />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;
