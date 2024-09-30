import { useEffect, useState } from "react";

// Import utils
import fetchRecentAudits from "../../utils/fetch-recent-audits";

// import Components
import Header from "../../components/header";
import RecentReports from "./recent-reports";
import SingleAuditReport from "./single-audit-report";
import Card from "../../components/card";
import FalconLoader from "../../components/falcon-loader";
import BackButton from "../../components/back-button";

function Report() {
  const [page, setPage] = useState("recent");

  const [isLoading, setLoading] = useState(true);
  const [recentAudits, setRecentAudits] = useState([]);
  const [singleAuditId, setSingleAuditId] = useState(null);
  const [singleLinkId, setSingleLinkId] = useState(null);

  useEffect(() => {
    fetchRecentAudits(setLoading, setRecentAudits);
  }, []);

  const clearSingleAuditId = () => {
    setPage("recent");
    setSingleAuditId(null);
  };

  const showDetails = (linkId) => {
    setPage("details");
    setSingleLinkId(linkId);
  };

  return (
    <div className="pr-2.5 text-sm">
      <div className="pt-8 max-w-screen-2xl mx-auto">
        <Header />
        {page === "recent" && (
          <RecentReports
            recentAudits={recentAudits}
            setSingleAuditId={setSingleAuditId}
            setPage={setPage}
            isLoading={isLoading}
          />
        )}
        {page === "single" && (
          <SingleAuditReport
            singleAuditId={singleAuditId}
            clearSingleAuditId={clearSingleAuditId}
            showDetails={showDetails}
          />
        )}
        {page === "details" && (
          <SingleAuditReport
            singleAuditId={singleAuditId}
            clearSingleAuditId={clearSingleAuditId}
            showDetails={showDetails}
          />
        )}
      </div>
    </div>
  );
}

export default Report;
