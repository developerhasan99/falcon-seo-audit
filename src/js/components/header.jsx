function Header() {
  return (
    <div className="bg-white p-6 rounded border border-solid border-gray-200">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 p-2 bg-gray-700 rounded-xl flex items-center justify-center">
            <img
              className="size-12"
              src={falcon_seo_obj.asset_url + "falcon-icon.svg"}
              alt="Falcon"
            />
          </div>
          <div>
            <h2 className="font-bold mb-2 text-2xl">Falcon Seo Audit</h2>
            <p className="text-gray-600 text-base">
              A user-focused SEO audit designed to enhance search engine
              visibility, drive more traffic, and ultimately increase your
              revenue.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-end md:flex-col-reverse">
          <div className="flex gap-4">
            <a
              className="px-4 py-2 border-2 border-solid border-gray-700 rounded text-gray-700 no-underline font-semibold hover:text-white hover:bg-gray-700 transition-colors duration-300"
              href="#"
            >
              Give A Feedback
            </a>
            <a
              className="px-4 py-2 border border-solid border-gray-700 rounded text-white  no-underline font-semibold bg-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 after:text-white active:text-white focus-within:text-white"
              href="https://developerhasan.com/"
              target="_blank"
            >
              Visit Plugin Author
            </a>
          </div>
          <p className="text-sm text-gray-600 m-0">v{falcon_seo_obj.version}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
