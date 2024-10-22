import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
// Import utils
import fetchRecentAudits from "../../axios/fetch-recent-audits";

// import Components
import Header from "../../components/header";
import RecentReports from "./recent-reports";
import SingleAuditReport from "./single-audit-report";
import Details from "./details";
import fetchLinkDetails from "../../axios/fetch-link-details";
import PageLinks from "./page-links";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

function Report() {
  const [page, setPage] = useState("recent");

  const [isLoading, setLoading] = useState(true);
  const [recentAudits, setRecentAudits] = useState([]);

  const [auditId, setAuditId] = useState(null);
  const [willBeDeleted, setWillBeDeleted] = useState("");

  const [singleLinkId, setSingleLinkId] = useState(null);
  const [link, setLink] = useState("");
  const [details, setDetails] = useState([]);

  const [pageLinks, setPageLinks] = useState([]);

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

  const deleteAudit = async (id) => {
    if (confirm("Are you sure you want to delete this audit?")) {
      setWillBeDeleted(id);

      const response = await axios.get(
        ajaxurl +
          "?action=delete_audit" +
          "&nonce=" +
          falcon_seo_obj.nonce +
          "&id=" +
          id
      );

      if (response.data.success === true) {
        toast.success("Audit deleted successfully");
        const newAudits = recentAudits.filter((audit) => audit.id !== id);
        setRecentAudits(newAudits);
      }
    }
  };

  const backToSingleAudit = () => {
    setPage("single");
    setSingleLinkId(null);
  };

  const showLinks = (url, links) => {
    setLink(url);
    setPageLinks(links);
    console.log(links);
  };

  const closeLinksModal = () => {
    setPageLinks([]);
  };

  useEffect(() => {
    fetchRecentAudits(setLoading, setRecentAudits);
  }, []);

  useEffect(() => {
    fetchLinkDetails(setLoading, singleLinkId, setDetails);
  }, [singleLinkId]);

  return (
    <div className="pr-2.5 text-sm">
      <div className="pt-8 max-w-screen-2xl mx-auto">
        <Header />
        {page === "recent" && (
          <RecentReports
            isLoading={isLoading}
            recentAudits={recentAudits}
            deleteAudit={deleteAudit}
            showAudit={showAudit}
            willBeDeleted={willBeDeleted}
          />
        )}
        {page === "single" && (
          <SingleAuditReport
            auditId={auditId}
            backToRecentReports={backToRecentReports}
            showDetails={showDetails}
            showLinks={showLinks}
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
      <AnimatePresence>
        {pageLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={() => closeLinksModal()}
            className="w-[calc(100%-160px)] h-[calc(100vh-32px)] cursor-pointer fixed z-10 top-8 left-40 bg-[rgba(51,51,51,0.95)]"
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pageLinks.length > 0 && (
          <PageLinks
            link={link}
            pageLinks={pageLinks}
            closeLinksModal={closeLinksModal}
          />
        )}
      </AnimatePresence>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Report;
