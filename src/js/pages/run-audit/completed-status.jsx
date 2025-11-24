import CheckIcon from "./check-icon";

function CompletedStatus({ runAudit, isInitiating }) {
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
        <button
          onClick={runAudit}
          disabled={isInitiating}
          className="px-8 py-2.5 inline-flex gap-2 items-center cursor-pointer border border-solid border-gray-700 rounded-full text-white text-base no-underline font-semibold bg-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 after:text-white active:text-white focus-within:text-white"
        >
          <img
            className="size-5"
            src={falcon_seo_obj.asset_url + "falcon-icon.svg"}
            alt="Falcon icon"
          />
          Run Audit
        </button>
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
