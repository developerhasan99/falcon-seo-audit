import FalconLoader from "../../components/falcon-loader";
import RadialProgress from "../../components/radial-progress";
import { motion } from "framer-motion";
import Card from "../../components/card";
import BackButton from "../../components/back-button";

function SingleAuditReport({
  auditId,
  isLoading,
  audit,
  backToRecentReports,
  showDetails,
}) {
  return (
    <Card>
      <h2 className="mb-6 pb-4 border-0 border-b border-solid border-gray-200 text-lg font-bold flex items-center gap-2">
        <BackButton onClick={backToRecentReports} />
        <span>Viewing audit report for: #{auditId}</span>
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isLoading ? (
          <FalconLoader loadingText="Loading audit report..." />
        ) : (
          <div>
            {audit.length > 0 ? (
              <table className="border border-solid border-gray-200 rounded w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th
                      scope="col"
                      className="px-4 py-3 border border-solid border-gray-300"
                    >
                      S/L
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 border border-solid border-gray-300"
                    >
                      Score
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 border border-solid border-gray-300"
                    >
                      URL
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 border border-solid border-gray-300"
                    >
                      HTTP Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 border border-solid border-gray-300"
                    >
                      Is indexable
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 border border-solid border-gray-300"
                    >
                      Links present
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 border border-solid border-gray-300"
                    >
                      Total errors
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 border border-solid border-gray-300"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {audit.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="border-0 border-b border-solid border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-4 py-2 font-bold text-gray-900 whitespace-nowrap"
                      >
                        {idx + 1}
                      </th>
                      <td className="px-4 py-2 border border-solid border-gray-200">
                        <RadialProgress progress={89} />
                      </td>
                      <td className="px-4 py-2  border border-solid border-gray-200">
                        <p className="text-base">{item.title}</p>
                        <a
                          href={item.url}
                          target="_blank"
                          className="text-blue-700"
                        >
                          {item.url}
                        </a>
                        &#10138;
                      </td>
                      <td className="px-4 py-2  border border-solid border-gray-200">
                        {item.status_code}
                      </td>
                      <td className="px-4 py-2  border border-solid border-gray-200">
                        Yes
                      </td>
                      <td className="px-4 py-2  border border-solid border-gray-200">
                        <button className="border-0 bg-transparent text-blue-600 cursor-pointer inline-flex gap-1 items-center">
                          {
                            item.internal_links.concat(item.external_links)
                              .length
                          }

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-4 py-2  border border-solid border-gray-200"></td>
                      <td className="px-4 py-2  border border-solid border-gray-200">
                        <button
                          onClick={() => showDetails(item.id, item.url)}
                          className="px-6 py-2 border-0 rounded-full font-semibold text-white no-underline bg-gray-600 hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-xl">No data found!</div>
            )}
          </div>
        )}
      </motion.div>
    </Card>
  );
}

export default SingleAuditReport;
