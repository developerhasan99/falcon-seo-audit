import Card from "../../components/card";
import { AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";

const IssueItem = ({ title, count, severity, lastScanned }) => (
  <div className="py-2 border-b border-gray-100 last:border-0">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5">
          {count} {count === 1 ? "page" : "pages"} affected
        </p>
      </div>
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          severity === "high"
            ? "bg-red-100 text-red-800"
            : severity === "medium"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-blue-100 text-blue-800"
        }`}
      >
        {severity === "high"
          ? "High"
          : severity === "medium"
          ? "Medium"
          : "Low"}
      </span>
    </div>
    <div className="mt-1 text-xs text-gray-400">
      Last scanned: {lastScanned}
    </div>
  </div>
);

const OpportunityItem = ({ title, impact, pages, improvement }) => (
  <div className="py-2 border-b border-gray-100 last:border-0">
    <h4 className="text-sm font-medium text-gray-900">{title}</h4>
    <div className="mt-1 flex items-center text-xs text-gray-500">
      <span className="inline-flex items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
        {impact} impact
      </span>
      <span className="mx-2">•</span>
      <span>{pages} pages affected</span>
    </div>
    <div className="mt-1 text-xs text-gray-600">
      {improvement} potential improvement
    </div>
  </div>
);

const SeoIssuesOpportunities = () => {
  // Sample data - replace with real data
  const criticalIssues = [
    {
      id: 1,
      title: "Broken Links",
      count: 24,
      severity: "high",
      lastScanned: "2 hours ago",
    },
    {
      id: 2,
      title: "Missing Meta Descriptions",
      count: 18,
      severity: "high",
      lastScanned: "2 hours ago",
    },
    {
      id: 3,
      title: "Duplicate Page Titles",
      count: 12,
      severity: "medium",
      lastScanned: "2 hours ago",
    },
  ];

  const seoOpportunities = [
    {
      id: 1,
      title: "Image Optimization",
      impact: "High",
      pages: 32,
      improvement: "+15% page speed",
    },
    {
      id: 2,
      title: "Internal Linking",
      impact: "Medium",
      pages: 24,
      improvement: "+20% engagement",
    },
    {
      id: 3,
      title: "Schema Markup",
      impact: "High",
      pages: 45,
      improvement: "Better rich results",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card className="border-l-4 border-red-500">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-500 h-5 w-5" />
            <h3 className="text-lg font-semibold">Critical SEO Issues</h3>
            <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {criticalIssues.length} Issues
            </span>
          </div>
          <div className="space-y-2">
            {criticalIssues.map((issue) => (
              <IssueItem key={issue.id} {...issue} />
            ))}
          </div>
          <button className="mt-4 text-sm font-medium text-red-600 hover:text-red-800">
            View all issues →
          </button>
        </div>
      </Card>

      <Card className="border-l-4 border-blue-500">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-blue-500 h-5 w-5" />
            <h3 className="text-lg font-semibold">SEO Opportunities</h3>
            <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {seoOpportunities.length} Opportunities
            </span>
          </div>
          <div className="space-y-2">
            {seoOpportunities.map((opp) => (
              <OpportunityItem key={opp.id} {...opp} />
            ))}
          </div>
          <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">
            View all opportunities →
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SeoIssuesOpportunities;
