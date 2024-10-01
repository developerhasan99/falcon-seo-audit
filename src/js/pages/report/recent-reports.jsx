import { AnimatePresence, motion } from "framer-motion";
import Card from "../../components/card";
import FalconLoader from "../../components/falcon-loader";
import RunFirstAudit from "../../components/run-first-audit";
import TableHead from "../../components/table-head";

function RecentReports({ isLoading, recentAudits, showAudit }) {
  return (
    <Card>
      <h2 className="mb-6 pb-4 border-0 border-b border-solid border-gray-200 text-base font-bold">
        Falcon SEO audit report
      </h2>
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
            >
              <div className="mb-6">
                <p>Last audit completed: 2022-01-01</p>
                <p>Status: Successful</p>
                <p>Total URLs audited: 100</p>
                <p>Total URLs with errors: 5</p>
                <p>Average SEO score: 90</p>
              </div>

              <h3 className="text-base font-bold mb-3">Recent reports:</h3>
              <table className="rounded w-full border-separate border-spacing-0 text-left">
                <TableHead
                  headings={[
                    "S/L",
                    "Initiated at",
                    "Status",
                    "Total URLs",
                    "Total Errors",
                    "Action",
                  ]}
                  top="32px"
                />

                <tbody>
                  {recentAudits.map((audit, idx) => (
                    <tr key={audit.initiated_at}>
                      <th
                        scope="row"
                        className="px-4 py-2 border border-solid border-gray-200 border-t-0 font-bold text-gray-900"
                      >
                        {idx + 1}
                      </th>
                      <td className="px-4 py-2 border border-solid border-gray-200 border-t-0 border-l-0">
                        {audit.initiated_at}
                      </td>
                      <td className="px-4 py-2 border border-solid border-gray-200 border-t-0 border-l-0">
                        <span
                          className={`inline-block px-4 py-1 rounded-full font-medium ${
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
                      </td>
                      <td className="px-4 py-2 border border-solid border-gray-200 border-t-0 border-l-0">
                        {audit.urls_count}
                      </td>
                      <td className="px-4 py-2 border border-solid border-gray-200 border-t-0 border-l-0">
                        5
                      </td>
                      <td className="px-4 py-2 border border-solid border-gray-200 border-t-0 border-l-0">
                        <button
                          onClick={() => showAudit(audit.id)}
                          className="px-6 py-2 border-0 rounded-full font-semibold text-white no-underline bg-gray-600 hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
                        >
                          View
                        </button>
                      </td>
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
    </Card>
  );
}

export default RecentReports;
