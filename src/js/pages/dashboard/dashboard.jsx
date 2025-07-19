import React from "react";
import Overview from "./overview";
import DashboardGraphs from "./graphs";
import MetricsOverview from "./metrics-overview";

const Dashboard = () => {
  return (
    <div>
      <Overview />
      <DashboardGraphs />
      <MetricsOverview />
    </div>
  );
};

export default Dashboard;
