import {
  HomeIcon,
  Link as LinkIcon,
  AlertTriangle,
  Gauge,
  Smartphone,
  Link2,
  FileText,
  Cpu,
  ChevronsUpDownIcon,
  Settings,
  HelpCircle,
  UserIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, icon: Icon, children }) => {
  return (
    <li className="mb-0 mt-2">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-l transition-colors duration-200 focus:ring-0
          ${
            isActive
              ? "bg-blue-50 text-blue-600 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <Icon className="shrink-0 size-4" />
        {children}
      </NavLink>
    </li>
  );
};

const Sidebar = () => {
  const navItems = [
    { to: "/", icon: HomeIcon, label: "Dashboard" },
    { to: "/crawled-urls", icon: LinkIcon, label: "Crawled URLs" },
    { to: "/seo-issues", icon: AlertTriangle, label: "SEO Issues" },
    { to: "/page-speed", icon: Gauge, label: "Page Speed" },
    { to: "/mobile-usability", icon: Smartphone, label: "Mobile Usability" },
    { to: "/backlinks", icon: Link2, label: "Backlinks" },
    { to: "/content-analysis", icon: FileText, label: "Content Analysis" },
    { to: "/technical-seo", icon: Cpu, label: "Technical SEO" },
  ];

  const settingsItems = [
    { to: "/help", icon: HelpCircle, label: "Help" },
    { to: "/settings", icon: Settings, label: "Settings" },
    { to: "/account", icon: UserIcon, label: "Account" },
  ];

  // TODO ADD sub menu items to account,
  // 1. Logout, 2. Account, 3. Transaction History, 4. Credit History

  return (
    <div className="falcon-sidebar hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-64 hidden fixed z-60 bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0">
      <div className="relative flex flex-col h-full max-h-full">
        <div className="px-6 pt-4 flex items-center">
          <NavLink
            to="/"
            className="flex-none rounded-xl text-xl font-semibold text-gray-800 focus:outline-none focus:ring-0 transition-colors duration-200 flex items-center gap-x-1"
          >
            <img
              className="size-8"
              src={falcon_seo_obj.asset_url + "falcon-icon.svg"}
              alt="Falcon"
            />
            Falcon SEO
          </NavLink>
        </div>
        <div className="px-3 mt-3">
          <div className="pl-3 pr-2 py-2 border border-gray-200 border-solid rounded-lg cursor-pointer flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-base">Recent Audits</h3>
              <p className="text-xs text-gray-400">06 July 2025 12:30 PM</p>
            </div>
            <div>
              <ChevronsUpDownIcon className="shrink-0 size-6 stroke-1 text-gray-500" />
            </div>
          </div>
        </div>
        <div className="h-full flex flex-col justify-between gap-12 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
          <nav className="p-3 w-full">
            <ul className="flex flex-col space-y-1 [&>li:first-child]:!mt-0">
              {navItems.map((item) => (
                <SidebarLink key={item.to} to={item.to} icon={item.icon}>
                  {item.label}
                </SidebarLink>
              ))}
            </ul>
          </nav>
          <nav className="p-3 w-full">
            <ul className="flex flex-col space-y-1 [&>li:first-child]:!mt-0">
              {settingsItems.map((item) => (
                <SidebarLink key={item.to} to={item.to} icon={item.icon}>
                  {item.label}
                </SidebarLink>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
