import {
  CoinsIcon,
  CommandIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
  UserIcon,
  LogOutIcon,
  ChevronDownIcon,
  ReceiptIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUser, useLogout } from "@/hooks/useAuth";
import { useState, useRef, useEffect } from "react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useUser();
  const logout = useLogout();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-x-0.5 text-sm font-medium text-gray-700 hover:text-blue-600"
      >
        <div className="inline-flex items-center justify-center size-10 rounded-full bg-gray-100 text-gray-600">
          <UserIcon className="size-6" />
        </div>
        <span className="hidden md:inline">
          {user.firstName} {user.lastName}
        </span>
        <ChevronDownIcon
          className={`size-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <Link
            to="/account"
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <UserIcon className="size-4" />
            Account
          </Link>
          <Link
            to="/account"
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <ReceiptIcon className="size-4" />
            Invoices
          </Link>
          <Link
            to="/account"
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <CoinsIcon className="size-4" />
            Credit History
          </Link>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
          >
            <LogOutIcon className="size-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  return (
    <header className="sticky top-8 z-50 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white border-b border-gray-200 text-sm py-2.5 lg:ps-65">
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
              <div className="absolute inset-y-0 end-0 flex items-center z-20 pe-1">
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
          <div className="inline-flex items-center gap-4">
            <Link
              to="/run-audit"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none"
            >
              <PlusIcon className="shrink-0 size-4" />
              New Audit
            </Link>
            <UserMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
