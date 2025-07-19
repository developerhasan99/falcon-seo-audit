import React, { useState } from "react";
import Overview from "./overview";
import Card from "../../components/card";
import Dropdown from "../../components/dropdown";

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  return (
    <div>
      <Overview />
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex flex-wrap justify-between items-center gap-2 p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              SEO Score Trend
            </h2>
            <Dropdown
              value={selectedTimeRange}
              onChange={setSelectedTimeRange}
              className="py-1.5"
              options={[
                { value: "7d", label: "Last 7 audits" },
                { value: "14d", label: "Last 14 audits" },
                { value: "30d", label: "Last 30 audits" },
                { value: "90d", label: "Last 90 audits" },
              ]}
            />
          </div>
          <div id="seo-score-trend-chart"></div>
        </Card>
        <Card>
          <div className="flex flex-wrap justify-between items-center gap-2 p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Issues Breakdown
            </h2>
            <button
              type="button"
              className="inline-flex justify-between items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-2xs hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
            >
              View All
            </button>
          </div>
          <div id="issues-breakdown-chart"></div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
