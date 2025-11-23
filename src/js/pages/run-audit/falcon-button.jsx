const FalconButton = ({ runAudit, text, isInitiating }) => {
  return (
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
      {text}
    </button>
  );
};

export default FalconButton;
