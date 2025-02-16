import FalconButton from "./falcon-button";
import CheckIcon from "./check-icon";

function CompletedStatus({ runAudit }) {
  return (
    <>
      <CheckIcon />
      <div className="text-center">
        <h2 className="text-lg font-bold mb-2">
          🎉 SEO Audit Completed Successfully!
        </h2>
        <p className="text-base">
          Your audit is finished. Review the report to see key insights and
          improvements you can make.
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <FalconButton runAudit={runAudit} text="Run Again" />
        <a
          href="/wp-admin/admin.php?page=audit-report"
          className="px-8 py-2.5 cursor-pointer border-2 border-solid border-gray-700 rounded-full bg-white text-base no-underline font-semibold text-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 after:text-white active:text-white focus-within:text-white"
        >
          View Report
        </a>
      </div>
    </>
  );
}

export default CompletedStatus;
