import { AnimatePresence, motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import BackButton from "../../components/back-button";
import Card from "../../components/card";
import FalconLoader from "../../components/falcon-loader";
import Pagination from "../../components/pagination";
import fetchSingleAudit from "../../axios/fetch-single-audit";

function SingleAuditReport() {
  const [isLoading, setLoading] = useState(false);
  const [audit, setAudit] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalCount, setTotalCount] = useState(1);

  const { id } = useParams();

  const onPageChange = (paginate) => {
    setPage(paginate);
  };

  useEffect(() => {
    if (Math.ceil(totalCount / perPage) < page) {
      setPage(Math.ceil(totalCount / perPage));
      return;
    }

    if (id) {
      fetchSingleAudit(setLoading, id, setAudit, page, perPage, setTotalCount);
    }
  }, [page, perPage, totalCount]);

  return (
    <>
      <h2 className="my-6 text-xl font-bold flex items-center gap-4">
        <BackButton />
        <span>Viewing audit report for: #{"auditId"}</span>
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
                <Card>
                  <div className="px-5 py-2 grid grid-cols-7 gap-2 rounded-t">
                    <div className="font-bold text-base">S/L</div>
                    <div className="font-bold text-base">URL</div>
                    <div className="font-bold text-base">Status Code</div>
                    <div className="font-bold text-base">Indexable</div>
                    <div className="font-bold text-base">Readability</div>
                    <div className="font-bold text-base">Links</div>
                    <div className="font-bold text-base">Actions</div>
                  </div>
                  {audit.map((item, index) => {
                    const robotTags = item.robots
                      .toLowerCase()
                      .split(",")
                      .map((val) => val.trim());

                    const internal_links = JSON.parse(
                      item.internal_links || "[]"
                    );
                    const external_links = JSON.parse(
                      item.external_links || "[]"
                    );

                    const links_present = [
                      ...internal_links,
                      ...external_links,
                    ];

                    return (
                      <div className="px-5 py-3 grid grid-cols-7 gap-2 items-center border-t border-solid border-gray-200">
                        <div className="text-base">
                          <strong>{index + 1}</strong>
                        </div>
                        <div className="text-base">
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
                        </div>
                        <div className="text-base">{item.status_code}</div>
                        <div className="text-base">
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
                        </div>
                        <div className="text-base">
                          {item.readability_score}
                        </div>
                        <div className="text-base">{links_present.length}</div>
                        <div className="text-base">
                          <Link
                            to={`/details/${item.id}`}
                            className="px-3 py-2 border-0 rounded text-sm text-white bg-gray-600 hover:bg-gray-800 transition-colors duration-300"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </Card>

                <div className="flex justify-between mt-4">
                  <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(totalCount / perPage)}
                    onPageChange={onPageChange}
                  />
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
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-xl">No data found!</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SingleAuditReport;
