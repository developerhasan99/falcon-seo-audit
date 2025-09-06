import React from "react";
import Overview from "./overview";
import DashboardGraphs from "./graphs";
import MetricsOverview from "./metrics-overview";
import SeoIssuesOpportunities from "./seo-issues-opportunities";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FalconLoader from "../../components/falcon-loader";
import { useAudit } from "../../hooks/useAudit";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoading, data, error } = useAudit();

  useEffect(() => {
    if (!data?.recentAudits || data?.recentAudits?.length > 0) {
      navigate("/run-audit");
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="h-[calc(100vh-150px)] flex items-center justify-center">
          <FalconLoader />
        </div>
      ) : (
        <div className="space-y-6">
          <Overview />
          <DashboardGraphs />
          <MetricsOverview />
          <SeoIssuesOpportunities />
        </div>
      )}
    </>
  );
};

export default Dashboard;
