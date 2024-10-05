import FalconButton from "./falcon-button";

function DefaultStatus({ runAudit }) {
  return (
    <>
      <img
        className="size-28"
        src={falcon_seo_obj.asset_url + "falcon-icon.svg"}
        alt="Falcon"
      />

      <div className="text-center">
        <h2 className="text-lg font-bold mb-2">
          Run a new SEO audit to see what needs improving!
        </h2>
        <p className="text-base">
          This audit will be run in the background. So, it is not necessary to
          stay in this page.
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <FalconButton runAudit={runAudit} text="Run Audit" />
      </div>
    </>
  );
}

export default DefaultStatus;
