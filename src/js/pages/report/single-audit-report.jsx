import FalconLoader from "../../components/falcon-loader";
import RadialProgress from "../../components/radial-progress";
import { motion } from "framer-motion";
import Card from "../../components/card";
import BackButton from "../../components/back-button";
import TableHead from "../../components/table-head";

function SingleAuditReport({
  auditId,
  isLoading,
  audit,
  backToRecentReports,
  showDetails,
  showLinks,
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
              <table className="rounded w-full border-spacing-0 border-separate text-left">
                <TableHead
                  headings={[
                    "S/L",
                    "Score",
                    "URL",
                    "HTTP Status Code",
                    "Indexable",
                    "Links Present",
                    "Total Errors",
                    "Action",
                  ]}
                  top="32px"
                />

                <tbody>
                  {audit.map((item, idx) => {
                    const internalLinks = JSON.parse(item.internal_links);
                    const externalLinks = JSON.parse(item.external_links);

                    const allLinks = [];

                    internalLinks.forEach((link) => {
                      allLinks.push({ ...link, type: "Internal" });
                    });

                    externalLinks.forEach((link) => {
                      allLinks.push({ ...link, type: "External" });
                    });

                    return (
                      <tr key={item.id}>
                        <th
                          scope="row"
                          className="px-4 py-2 font-bold text-gray-900 whitespace-nowrap border-0 border-b border-l border-r border-gray-200"
                        >
                          {idx + 1}
                        </th>
                        <td className="px-4 py-2 border-0 border-r border-b border-solid border-gray-200">
                          <RadialProgress progress={89} />
                        </td>
                        <td className="px-4 py-2  border-0 border-r border-b border-solid border-gray-200">
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
                        <td className="px-4 py-2  border-0 border-r border-b border-solid border-gray-200">
                          {item.status_code}
                        </td>
                        <td className="px-4 py-2  border-0 border-r border-b border-solid border-gray-200">
                          Yes
                        </td>
                        <td className="px-4 py-2  border-0 border-r border-b border-solid border-gray-200">
                          <button
                            onClick={() => showLinks(item.url, allLinks)}
                            className="border-0 bg-transparent text-blue-600 cursor-pointer inline-flex gap-1 items-center"
                          >
                            {allLinks.length}

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
                        <td className="px-4 py-2  border-0 border-r border-b border-solid border-gray-200"></td>
                        <td className="px-4 py-2  border-0 border-r border-b border-solid border-gray-200">
                          <button
                            onClick={() => showDetails(item.id, item.url)}
                            className="px-6 py-2 border-0 rounded-full font-semibold text-white no-underline bg-gray-600 hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
