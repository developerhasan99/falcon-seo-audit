import {
  HomeIcon,
  Link as LinkIcon,
  AlertTriangle,
  Gauge,
  Smartphone,
  Link2,
  FileText,
  Cpu,
  Settings,
  HelpCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import AuditSelector from "./audit-selector";
import SidebarLink from "./sidebar-link";
import axios from "../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
];

const Sidebar = () => {
  const navigate = useNavigate();
  const domain = new URL(falcon_seo_obj.site_url).hostname;
  const { isLoading, error, data } = useQuery({
    queryKey: ["audits"],
    queryFn: () =>
      axios
        .get("/audit/recent-audits", {
          params: {
            domain,
          },
        })
        .then((res) => res.data),
  });

  useEffect(() => {
    if (data?.redirect === "run-audit") {
      navigate("/run-audit");
    }
  }, [data]);

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
        <AuditSelector />
        <div className="h-full flex flex-col justify-between gap-12 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
          <nav className="p-3 w-full">
            {data?.recentAudits?.length !== 0 && (
              <ul className="flex flex-col space-y-1 [&>li:first-child]:!mt-0">
                {navItems.map((item) => (
                  <SidebarLink key={item.to} to={item.to} icon={item.icon}>
                    {item.label}
                  </SidebarLink>
                ))}
              </ul>
            )}
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
