import Card from "../../components/card";
import { CpuIcon, FileTextIcon, TabletSmartphoneIcon } from "lucide-react";

const MetricCard = ({ title, children, Icon }) => (
  <Card className="flex-1">
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
        <Icon className="size-4 flex-shrink-0" />
        {title}
      </h3>
      {children}
    </div>
  </Card>
);

const MetricItem = ({ label, value, status }) => {
  let statusClass = "";
  if (status === "good" || status === "excellent" || status === "secure") {
    statusClass = "text-green-600";
  } else if (status === "needs-work") {
    statusClass = "text-yellow-600";
  }

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm font-medium ${statusClass}`}>{value}</span>
    </div>
  );
};

const MetricsOverview = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <MetricCard title="Technical SEO" Icon={CpuIcon}>
      <MetricItem label="Crawlability" value="Good" status="good" />
      <MetricItem label="Indexability" value="Needs Work" status="needs-work" />
      <MetricItem label="Site Structure" value="Excellent" status="excellent" />
      <MetricItem label="HTTPS Implementation" value="Secure" status="secure" />
    </MetricCard>

    <MetricCard title="Content Analysis" Icon={FileTextIcon}>
      <MetricItem label="Duplicate Content" value="12 pages" />
      <MetricItem label="Missing Meta Descriptions" value="8 pages" />
      <MetricItem label="H1 Tags" value="98% covered" status="good" />
      <MetricItem
        label="Image Alt Tags"
        value="76% covered"
        status="needs-work"
      />
    </MetricCard>

    <MetricCard title="Mobile & Performance" Icon={TabletSmartphoneIcon}>
      <MetricItem label="Mobile Friendliness" value="85%" status="good" />
      <MetricItem label="Core Web Vitals" value="67%" status="needs-work" />
      <MetricItem label="Page Load Speed" value="2.8s avg" status="good" />
      <MetricItem
        label="Cumulative Layout Shift"
        value="0.02 avg"
        status="good"
      />
    </MetricCard>
  </div>
);

export default MetricsOverview;
