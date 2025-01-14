import { useState, useEffect } from "react";
import fetchSingleAudit from "../../axios/fetch-single-audit";
import FalconLoader from "../../components/falcon-loader";
import { AnimatePresence, motion } from "framer-motion";
import Card from "../../components/card";
import BackButton from "../../components/back-button";
import TableHead from "../../components/table-head";
import { Search } from "lucide-react";
import Pagination from "../../components/pagination";

function SingleAuditReport({
  auditId,
  backToRecentReports,
  showDetails,
  showLinks,
}) {
  const [isLoading, setLoading] = useState(false);
  const [audit, setAudit] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalCount, setTotalCount] = useState(1);

  const onPageChange = (paginate) => {
    setPage(paginate);
  };

  useEffect(() => {
    if (Math.ceil(totalCount / perPage) < page) {
      setPage(Math.ceil(totalCount / perPage));
      return;
    }

    fetchSingleAudit(
      setLoading,
      auditId,
      setAudit,
      page,
      perPage,
      setTotalCount
    );
  }, [auditId, page, perPage, totalCount]);

  return (
    <Card>
      <h2 className="mb-6 pb-4 border-0 border-b border-solid border-gray-200 text-base font-bold flex items-center gap-4">
        <BackButton onClick={backToRecentReports} />
        <span>Viewing audit report for: #{auditId}</span>
      </h2>
      <AnimatePresence>
        {isLoading ? (
          <FalconLoader loadingText="Loading audit report..." />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {audit.length > 0 ? (
              <>
                <table className="rounded w-full border-separate border-spacing-0 text-left">
                  <TableHead
                    top="32px"
                    headings={[
                      "S/L",
                      "URL",
                      "Status",
                      "Indexable",
                      "Readability",
                      "Links",
                      "Actions",
                    ]}
                  />
                  <tbody>
                    {audit.map((item, index) => {
                      const internal_links = JSON.parse(item.internal_links || "[]");
                      const external_links = JSON.parse(item.external_links || "[]");

                      const robotTags = item.robots
                        .toLowerCase()
                        .split(",")
                        .map((val) => val.trim());

                      const links_present = [
                        ...internal_links.map((link) => ({ ...link, type: "internal" })),
                        ...external_links.map((link) => ({ ...link, type: "external" })),
                      ];

                      return (
                        <tr key={item.id}>
                          <td className="px-4 py-3 font-semibold border-0 border-solid border-gray-200 border-b border-r border-l ">
                            {index + 1 + (page - 1) * perPage}
                          </td>
                          <td className="px-4 py-3 border-0 border-solid border-gray-200 border-b border-r">
                            <div className="max-w-80">
                              <p className="text-sm text-gray-900 max-line-elips">
                                {item.title}
                              </p>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:underline newtab max-line-elips"
                              >
                                {item.url}
                              </a>
                            </div>
                          </td>
                          <td className="px-4 py-3 border-0 border-solid border-gray-200 border-b border-r">
                            {item.status_code}
                          </td>
                          <td className="px-4 py-3 border-0 border-solid border-gray-200 border-b border-r">
                            {!item.robots ? (
                              <span className="inline-block px-2 mr-1 rounded-full text-sm text-yellow-600 bg-yellow-200">
                                Not set
                              </span>
                            ) : robotTags.includes("noindex") ? (
                              <span className="inline-block px-2 mr-1 rounded-full text-sm text-red-600 bg-red-200">
                                No
                              </span>
                            ) : (
                              <span className="inline-block px-2 mr-1 rounded-full text-sm text-green-600 bg-green-200">
                                Yes
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 border-0 border-solid border-gray-200 border-b border-r">
                            {item.readability_score}
                          </td>
                          <td className="px-4 py-3 border-0 border-solid border-gray-200 border-b border-r">
                            <button
                              onClick={() => showLinks(item.url, links_present)}
                              className="border-0 bg-transparent cursor-pointer inline-flex gap-1 items-center"
                            >
                              <span className="text-blue-600">
                                {links_present.length}
                              </span>
                              <Search size={14} />
                            </button>
                          </td>
                          <td className="px-4 py-3 border-0 border-solid border-gray-200 border-b border-r">
                            <button
                              onClick={() => showDetails(item.id, item.url)}
                              className="px-4 py-2 border-0 rounded font-semibold text-white bg-gray-600 hover:bg-gray-800 transition-colors duration-300"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex justify-between mt-4">
                  <div className="flex gap-2 items-center">
                    <span className="text-base">Items per page: </span>
                    <select
                      value={perPage}
                      onChange={(e) => setPerPage(Number(e.target.value))}
                      className="border border-solid border-gray-300 px-4 py-2 rounded pr-8 font-semibold"
                    >
                      {[5, 10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                          Show {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(totalCount / perPage)}
                    onPageChange={onPageChange}
                  />
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-xl">No data found!</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default SingleAuditReport;
