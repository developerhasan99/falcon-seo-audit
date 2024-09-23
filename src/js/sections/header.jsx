function Header() {
  return (
    <div className="bg-white p-6 rounded">
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
            <h2 className="m-0 mb-2 text-2xl">Falcon Seo Audit</h2>
            <p className="text-sm m-0 text-gray-600">
              Falcon SEO Audit provides an advanced SEO audit from the user's
              perspective, helping you improve your website&apos;s performance
              and search engine visibility.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-end md:flex-col-reverse">
          <div className="flex gap-4">
            <a
              className="px-4 py-2 border-2 border-solid border-gray-700 rounded text-gray-700 no-underline hover:text-white hover:bg-gray-700 transition-colors duration-300"
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
