import { ChartColumn, Gauge, Globe, TabletSmartphone } from "lucide-react";
import Card from "../../components/card";

const OverviewCard = ({
  title,
  count,
  change = null,
  changeType = null,
  changeLabel = "from last audit",
  noChangeLabel = "No changes from last audit",
  accentColor = "#22c55d",
  Icon = Globe,
}) => {
  const hasChange = change !== null && changeType !== null;

  return (
    <Card className="relative">
      <div className="p-4">
        <div className="flex items-center gap-x-2">
          <p className="text-xs uppercase text-gray-500">{title}</p>
        </div>
        <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
          {count}
        </h3>
        <div className="mt-1 flex items-center gap-x-2 text-sm">
          {hasChange ? (
            <>
              <span
                className="flex items-center gap-x-1"
                style={{
                  color: changeType === "up" ? "#22c55d" : "#ef4444",
                }}
              >
                {changeType === "up" ? (
                  <svg
                    className="inline-block size-4 self-center"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                ) : (
                  <svg
                    className="inline-block size-4 self-center"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                    <polyline points="16 17 22 17 22 11"></polyline>
                  </svg>
                )}
                <span>{change}</span>
              </span>
              <span className="text-xs text-gray-500">{changeLabel}</span>
            </>
          ) : (
            <span className="text-xs text-gray-500">{noChangeLabel}</span>
          )}
        </div>
      </div>
      <div
        className="absolute top-4 right-4 size-8 bg-green-500/15 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: accentColor + "1a" }}
      >
        <Icon className="size-4" style={{ color: accentColor }} />
      </div>
    </Card>
  );
};

const Overview = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-6">
      <OverviewCard
        title="SEO Score"
        count="78"
        change="+5"
        changeType="up"
        accentColor="#22c55d"
        Icon={ChartColumn}
      />
      <OverviewCard
        title="Crawled URLs"
        count="1,247"
        change="+23"
        changeType="up"
        accentColor="#2463eb"
        Icon={Globe}
      />
      <OverviewCard
        title="Mobile Usability"
        count="92%"
        change="-2"
        changeType="down"
        accentColor="#ef4444"
        Icon={TabletSmartphone}
      />
      <OverviewCard
        title="Page Speed"
        count="85%"
        change="-7"
        changeType="down"
        accentColor="#f59e0c"
        Icon={Gauge}
      />
    </div>
  );
};

export default Overview;
