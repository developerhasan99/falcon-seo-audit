import { useEffect, useState } from "react";

// Import utils
import fetchRecentAudits from "../../utils/fetch-recent-audits";

// import Components
import Header from "../../components/header";
import RecentReports from "./recent-reports";
import SingleAuditReport from "./single-audit-report";
import fetchSingleAudit from "../../utils/fetch-singel-audit";
import Details from "./details";
import fetchLinkDetails from "../../utils/fetch-link-details";

function Report() {
  const [page, setPage] = useState("recent");

  const [isLoading, setLoading] = useState(true);
  const [recentAudits, setRecentAudits] = useState([]);

  const [auditId, setAuditId] = useState(null);
  const [audit, setAudit] = useState([]);

  const [singleLinkId, setSingleLinkId] = useState(null);
  const [link, setLink] = useState("");
  const [details, setDetails] = useState([]);

  const showAudit = (id) => {
    setAuditId(id);
    setPage("single");
  };

  const backToRecentReports = () => {
    setPage("recent");
  };

  const showDetails = (linkId, link) => {
    setPage("details");
    setSingleLinkId(linkId);
    setLink(link);
  };

  const backToSingleAudit = () => {
    setPage("single");
    setSingleLinkId(null);
  };

  useEffect(() => {
    fetchRecentAudits(setLoading, setRecentAudits);
  }, []);

  useEffect(() => {
    fetchSingleAudit(setLoading, auditId, setAudit);
  }, [auditId]);

  useEffect(() => {
    fetchLinkDetails(setLoading, auditId, singleLinkId, setDetails);
  }, [singleLinkId]);

  return (
    <div className="pr-2.5 text-sm">
      <div className="pt-8 max-w-screen-2xl mx-auto">
        <Header />
        {page === "recent" && (
          <RecentReports
            isLoading={isLoading}
            recentAudits={recentAudits}
            showAudit={showAudit}
          />
        )}
        {page === "single" && (
          <SingleAuditReport
            auditId={auditId}
            isLoading={isLoading}
            audit={audit}
            backToRecentReports={backToRecentReports}
            showDetails={showDetails}
          />
        )}
        {page === "details" && (
          <Details
            isLoading={isLoading}
            link={link}
            details={details}
            backToSingleAudit={backToSingleAudit}
          />
        )}
      </div>
    </div>
  );
}

export default Report;
