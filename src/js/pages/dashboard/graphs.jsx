import { useMemo, useState } from 'react';
import Card from '../../components/card';
import Dropdown from '../../components/dropdown';
import { SEOScoreTrendChart, IssuesBreakdownChart } from '../../components/charts';

export const SEOScoreGraph = ({ selectedTimeRange, onTimeRangeChange }) => {
  // Generate dummy data for SEO Score Trend
  const seoScoreData = useMemo(() => {
    const now = new Date();
    const dates = [];
    const scores = [];

    // Generate data for last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
      // Random score between 60-95
      scores.push(Math.floor(Math.random() * 35) + 60);
    }

    return { dates, scores };
  }, []);

  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center gap-2 p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          SEO Score Trend
        </h2>
        <Dropdown
          value={selectedTimeRange}
          onChange={onTimeRangeChange}
          className="py-1.5"
          options={[
            { value: "7d", label: "Last 7 audits" },
            { value: "14d", label: "Last 14 audits" },
            { value: "30d", label: "Last 30 audits" },
            { value: "90d", label: "Last 90 audits" },
          ]}
        />
      </div>
      <SEOScoreTrendChart data={seoScoreData} />
    </Card>
  );
};

export const IssuesBreakdownGraph = () => {
  // Dummy data for Issues Breakdown
  const issuesData = useMemo(() => ({
    content: Math.floor(Math.random() * 50) + 10,
    technical: Math.floor(Math.random() * 30) + 5,
    performance: Math.floor(Math.random() * 40) + 5,
  }), []);

  return (
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
      <IssuesBreakdownChart data={issuesData} />
    </Card>
  );
};

export const DashboardGraphs = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <SEOScoreGraph 
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={setSelectedTimeRange}
      />
      <IssuesBreakdownGraph />
    </div>
  );
};

export default DashboardGraphs;