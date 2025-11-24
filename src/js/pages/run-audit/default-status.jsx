function DefaultStatus({ runAudit, isInitiating }) {
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
      </div>
    </>
  );
}

export default DefaultStatus;
