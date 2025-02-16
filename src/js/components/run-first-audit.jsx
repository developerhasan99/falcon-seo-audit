import { Link } from "react-router-dom";

function RunFirstAudit() {
  return (
    <div className="flex flex-col items-center gap-10 mb-10">
      <img
        className="size-28"
        src={falcon_seo_obj.asset_url + "empty-box.svg"}
        alt="Empty Box"
      />
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">No audit found in database!</h3>
        <p className="text-base">
          You haven't run any audits yet! Please start your first audit to
          generate reports.
        </p>
      </div>
      <Link
        to="/run-audit"
        className="px-8 py-2.5 cursor-pointer border border-solid border-gray-700 rounded-full text-white text-base no-underline font-semibold bg-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 after:text-white active:text-white focus-within:text-white"
      >
        Run audit
      </Link>
    </div>
  );
}

export default RunFirstAudit;
