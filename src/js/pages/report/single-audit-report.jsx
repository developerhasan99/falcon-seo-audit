import FalconLoader from "../../components/falcon-loader";
import RadialProgress from "../../components/radial-progress";
import { AnimatePresence, motion } from "framer-motion";
import Card from "../../components/card";
import BackButton from "../../components/back-button";
import DataTable from "./datatable";

function SingleAuditReport({
  auditId,
  isLoading,
  audit,
  backToRecentReports,
  showDetails,
  showLinks,
}) {
  const columns = [
    {
      Header: "S/L",
      accessor: (_, index) => index + 1, // For row numbering
      Cell: ({ value }) => <strong>{value}</strong>,
    },
    {
      Header: "URL",
      accessor: "url",
      Cell: ({ value, row }) => (
        <>
          <p className="text-base">{row.original.title}</p>
          <a
            href={value}
            target="_blank"
            className="text-blue-700 hover:underline newtab"
          >
            {value}
          </a>
        </>
      ),
    },
    {
      Header: "HTTP Status Code",
      accessor: "status_code",
    },
    {
      Header: "Robot Tag",
      accessor: "robots",
    },
    {
      Header: "Readability Score",
      accessor: "readability_score",
    },
    {
      Header: "Links Present",
      accessor: "links_present",
      Cell: ({ value, row }) => (
        <button
          onClick={() => showLinks(row.original.url, value)}
          className="border-0 bg-transparent text-blue-600 cursor-pointer inline-flex gap-1 items-center"
        >
          {value.length}
          <img src={falcon_seo_obj.asset_url + "search.svg"} alt="Expand" />
        </button>
      ),
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <button
          onClick={() => showDetails(row.original.id, row.original.url)}
          className="px-4 py-2 border-0 rounded font-semibold text-white bg-gray-600 hover:bg-gray-800 transition-colors duration-300"
        >
          View
        </button>
      ),
    },
  ];

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
              <DataTable columns={columns} data={audit} />
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
