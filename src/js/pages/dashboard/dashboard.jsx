import React from "react";
import Overview from "./overview";
import DashboardGraphs from "./graphs";
import MetricsOverview from "./metrics-overview";
import SeoIssuesOpportunities from "./seo-issues-opportunities";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <Overview />
      <DashboardGraphs />
      <MetricsOverview />
      <SeoIssuesOpportunities />
    </div>
  );
};

export default Dashboard;
