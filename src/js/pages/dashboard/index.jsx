import { useEffect, useState } from "react";

// Import utils
import fetchRecentAudits from "../../utils/fetch-recent-audits";

// import Components
import Card from "../../components/card";
import Header from "../../sections/header";
import FalconLoader from "../../components/falcon-loader";
import RecentReports from "../../components/recent-reports";
import RunFirstAudit from "../../components/run-first-audit";
import SingleAuditReport from "./single-audit-report";

function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [recentAudits, setRecentAudits] = useState([]);
  const [singleAuditId, setSingleAuditId] = useState(null);

  useEffect(() => {
    fetchRecentAudits(setLoading, setRecentAudits);
  }, []);

  const clearSingleAuditId = () => {
    setSingleAuditId(null);
  };

  return (
    <div className="pr-2.5">
      <div className="pt-8 max-w-screen-xl mx-auto">
        <Header />
        <Card title="Falcon SEO audit report">
          {isLoading ? (
            <FalconLoader loadingText="Loading data..." />
          ) : (
            <>
              {recentAudits.length === 0 ? (
                <RunFirstAudit />
              ) : (
                <>
                  {singleAuditId ? (
                    <SingleAuditReport
                      singleAuditId={singleAuditId}
                      clearSingleAuditId={clearSingleAuditId}
                    />
                  ) : (
                    <div>
                      <p>Last audit completed: 2022-01-01</p>
                      <p>Status: Successful</p>
                      <p>Total URLs audited: 100</p>
                      <p>Total URLs with errors: 5</p>
                      <p>Average SEO score: 90</p>

                      <h3>Recent reports:</h3>
                      <RecentReports
                        recentAudits={recentAudits}
                        setSingleAuditId={setSingleAuditId}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
