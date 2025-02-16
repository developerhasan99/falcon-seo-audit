import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Card from "../../components/card";
import FalconLoader from "../../components/falcon-loader";
import { Link } from "react-router-dom";
import RunFirstAudit from "../../components/run-first-audit";
import axios from "axios";
import fetchRecentAudits from "../../axios/fetch-recent-audits";
import moment from "moment";
import { toast } from "react-toastify";

function RecentReports() {
  const [isLoading, setLoading] = useState(true);
  const [recentAudits, setRecentAudits] = useState([]);
  const [willBeDeleted, setWillBeDeleted] = useState("");

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

  useEffect(() => {
    fetchRecentAudits(setLoading, setRecentAudits);
  }, []);

  return (
    <>
      <h2 className="my-6 text-xl font-bold">Recent reports:</h2>
      {isLoading ? (
        <FalconLoader loadingText="Loading recent reports..." />
      ) : (
        <AnimatePresence>
          {recentAudits.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="recent-reports"
            >
              <Card>
                <div className="px-5 py-2 grid grid-cols-5 gap-4 rounded-t">
                  <div className="font-bold text-base">S/L</div>
                  <div className="font-bold text-base">Initiated at</div>
                  <div className="font-bold text-base">Status</div>
                  <div className="font-bold text-base">Total URLs</div>
                  <div className="font-bold text-base">Actions</div>
                </div>
                {recentAudits.map((audit, index) => (
                  <div
                    className={`px-5 py-3 grid grid-cols-5 gap-4 items-center border-t border-solid border-gray-200 ${
                      willBeDeleted === audit.id ? "bg-red-100" : ""
                    }`}
                  >
                    <div className="text-base">
                      <strong>{index + 1}</strong>
                    </div>
                    <div className="text-base">
                      {moment(audit.initiated_at).format("DD MMM, h:mm A")}
                    </div>
                    <div className="text-base">
                      <span
                        className={`inline-block px-4 py-1 rounded-full font-medium text-sm ${
                          audit.status === "pending"
                            ? "bg-gray-200 text-gray-700"
                            : audit.status === "running"
                            ? "bg-sky-200 text-sky-700"
                            : audit.status === "completed"
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-700"
                        }`}
                      >
                        {audit.status}
                      </span>
                    </div>
                    <div className="text-base">{audit.urls_count}</div>
                    <div className="text-base">
                      <button
                        onClick={() => deleteAudit(audit.id)}
                        className="mr-4 px-3 py-2 border-0 rounded text-red-500 bg-red-50 text-sm hover:bg-red-600 hover:text-white transition-colors duration-300"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/reports/${audit.id}`}
                        className="px-3 py-2 border-0 rounded text-sm text-white bg-gray-600 hover:bg-gray-800 transition-colors duration-300"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </Card>
            </motion.div>
          ) : (
            <RunFirstAudit />
          )}
        </AnimatePresence>
      )}
    </>
  );
}

export default RecentReports;
