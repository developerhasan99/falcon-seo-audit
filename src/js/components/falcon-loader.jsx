function FalconLoader({ loadingText }) {
  return (
    <div className="mb-6 flex flex-col items-center">
      <div className="relative size-32 mb-2">
        <img
          className="size-16 absolute left-1/2  top-1/2 [transform:translate(-50%,-50%)]"
          src={falcon_seo_obj.asset_url + "falcon-icon.svg"}
          alt="Falcon SEO Audit"
        />
        <div className="absolute left-1/2 top-1/2 [transform:translate(-50%,-50%)] -inset-6">
          <div className=" border-gray-300 absolute inset-0 animate-spin rounded-full border-4 border-solid border-t-[#fca326] [animation-duration:0.5s]" />
        </div>
        <div className="absolute left-1/2 top-1/2 [transform:translate(-50%,-50%)] -inset-8">
          <div className=" border-gray-300 absolute inset-0 animate-spin rounded-full border-4 border-solid border-t-[#fc6d26] [animation-duration:1s]" />
        </div>
        <div className="absolute left-1/2 top-1/2 [transform:translate(-50%,-50%)] -inset-10">
          <div className=" border-gray-300 absolute inset-0 animate-spin rounded-full border-4 border-solid border-t-[#e24329] [animation-duration:1.5s]" />
        </div>
      </div>
      <p className="text-2xl text-gray-400 italic m-0">{loadingText}</p>
    </div>
  );
}

export default FalconLoader;
