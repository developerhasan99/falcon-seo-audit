import React from "react";
import Overview from "./overview";
import DashboardGraphs from "./graphs";
import MetricsOverview from "./metrics-overview";
import SeoIssuesOpportunities from "./seo-issues-opportunities";
import FalconLoader from "../../components/falcon-loader";

const Dashboard = () => {
  return (
    <>
      {true ? (
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
