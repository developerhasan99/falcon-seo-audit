import { twMerge } from "tailwind-merge";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, icon: Icon, children, className }) => {
  return (
    <li className="mb-0 mt-2">
      <NavLink
        to={to}
        className={({ isActive }) =>
          twMerge(
            "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-l transition-colors duration-200 focus:ring-0",
            isActive
              ? "bg-blue-50 text-blue-600 font-medium"
              : "text-gray-700 hover:bg-gray-100",
            className
          )
        }
      >
        <Icon className="shrink-0 size-4" />
        {children}
      </NavLink>
    </li>
  );
};

export default SidebarLink;
