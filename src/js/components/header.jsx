import {
  CommandIcon,
  DownloadIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white border-b border-gray-200 text-sm py-2.5 lg:ps-65">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div className="me-5 lg:me-0 lg:hidden flex items-center">
          <div className="font-bold">Falcon SEO Audit</div>
        </div>
        <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                <SearchIcon className="shrink-0 size-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="py-2 ps-10 pe-16 block w-full bg-white border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Search"
              />

              {/* The hidden X button to clear the search input */}
              <div className="hidden absolute inset-y-0 end-0 flex items-center z-20 pe-1">
                <button
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="shrink-0 size-4" />
                </button>
              </div>
              <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400">
                <CommandIcon className="shrink-0 size-3.5" />
                <span className="mx-1">
                  <PlusIcon className="shrink-0 size-3 text-gray-400" />
                </span>
                <span className="text-xs">/</span>
              </div>
            </div>
          </div>
          <div className="inline-flex gap-x-2">
            <a
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              <PlusIcon className="shrink-0 size-4" />
              New Crawl
            </a>
            <a
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
              href="#"
            >
              <DownloadIcon className="shrink-0 size-4" />
              Export Report
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
