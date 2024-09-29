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
import BackButton from "../../components/back-button";

function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [recentAudits, setRecentAudits] = useState([]);
  const [singleAuditId, setSingleAuditId] = useState(null);
  const [singleLinkId, setSingleLinkId] = useState(null);

  useEffect(() => {
    fetchRecentAudits(setLoading, setRecentAudits);
  }, []);

  const clearSingleAuditId = () => {
    setSingleAuditId(null);
  };

  return (
    <div className="pr-2.5 text-sm">
      <div className="pt-8 max-w-screen-xl mx-auto">
        <Header />
        <Card>
          <h2 className="m-0 mb-6 pb-4 border-0 border-b border-solid border-gray-200 text-xl">
            {singleAuditId ? (
              <div className="flex gap-2 items-center">
                <BackButton onClick={clearSingleAuditId} />
                <span>Viewing audit report for: #{singleAuditId}</span>
              </div>
            ) : (
              "Falcon SEO audit report"
            )}
          </h2>
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
