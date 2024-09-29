function RunFirstAudit() {
  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <img
        className="size-28"
        src={falcon_seo_obj.asset_url + "empty-box.svg"}
        alt="Empty Box"
      />
      <h3>You did not run any audit yet!</h3>
      <a
        href="#"
        className="px-8 py-2.5 cursor-pointer border border-solid border-gray-700 rounded-full text-white text-base no-underline font-semibold bg-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 after:text-white active:text-white focus-within:text-white"
      >
        Run your first audit
      </a>
    </div>
  );
}

export default RunFirstAudit;
