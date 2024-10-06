import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import moment from "moment";
import Card from "../../components/card";
import FalconLoader from "../../components/falcon-loader";
import RunFirstAudit from "../../components/run-first-audit";
import DataTable from "./datatable";

function RecentReports({ isLoading, recentAudits, deleteAudit, showAudit }) {
  const columns = useMemo(
    () => [
      {
        Header: "S/L",
        accessor: (_, index) => index + 1, // For row numbering
        Cell: ({ value }) => <strong>{value}</strong>,
      },
      {
        Header: "Initiated at",
        accessor: "initiated_at",
        Cell: ({ value }) =>
          moment(value).format("dddd, MMMM Do YYYY, h:mm:ss A"),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`inline-block px-4 py-1 rounded-full font-medium ${
              value === "pending"
                ? "bg-gray-200 text-gray-700"
                : value === "running"
                ? "bg-sky-200 text-sky-700"
                : value === "completed"
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Total URLs",
        accessor: "urls_count",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            <button
              onClick={() => deleteAudit(row.original.id)}
              className="px-6 py-2 mr-2 border-0 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors duration-300"
            >
              Delete
            </button>
            <button
              onClick={() => showAudit(row.original.id)}
              className="px-6 py-2 border-0 rounded-full font-semibold text-white bg-gray-600 hover:bg-gray-800 transition-colors duration-300"
            >
              View
            </button>
          </>
        ),
      },
    ],
    []
  );

  return (
    <Card>
      <h2 className="mb-6 pb-4 border-0 border-b border-solid border-gray-200 text-base font-bold">
        Falcon SEO audit reports:
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
              <DataTable data={recentAudits} columns={columns} />
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
