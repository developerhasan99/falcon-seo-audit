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
              <table className="bg-white rounded border border-solid border-gray-200 w-full">
                <thead>
                  <tr>
                    <TH>S/L</TH>
                    <TH>Initiated at</TH>
                    <TH>Status</TH>
                    <TH>Total URLs</TH>
                    <TH>Actions</TH>
                  </tr>
                </thead>
                <tbody>
                  {recentAudits.map((audit, index) => (
                    <tr
                      key={audit.id}
                      className={`${
                        willBeDeleted === audit.id ? "bg-red-100" : ""
                      }`}
                    >
                      <TD>
                        <strong>{index + 1}</strong>
                      </TD>
                      <TD>
                        {moment(audit.initiated_at).format("DD MMM, h:mm A")}
                      </TD>
                      <TD>
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
                      </TD>
                      <TD>{audit.urls_count}</TD>
                      <TD>
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
                      </TD>
                    </tr>
                  ))}
                </tbody>
              </table>
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

const TD = ({ children }) => {
  return (
    <td className="text-base px-5 py-3 border-t border-solid border-gray-200">
      {children}
    </td>
  );
};

const TH = ({ children }) => {
  return (
    <th className="text-base px-5 py-2 border-t border-solid border-gray-200 text-left">
      {children}
    </th>
  );
};
