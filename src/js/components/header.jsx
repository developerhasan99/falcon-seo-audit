import { NavLink } from "react-router-dom";

function Header() {
  const activeLinkStyle = {
    color: "#e24329",
  };

  return (
    <div className="bg-white p-4 shadow-lg shadow-gray-100">
      <div className="max-w-screen-xl flex gap-6 items-center justify-between">
        <div className="flex items-center pr-6 border-r border-solid border-gray-200">
          <img
            className="size-8"
            src={falcon_seo_obj.asset_url + "falcon-icon.svg"}
            alt="Falcon"
          />
          <h2 className="text-2xl font-bold text-gray-700">FSA</h2>
        </div>
        <div className="flex gap-6 mr-auto">
          <NavLink
            className="text-base font-semibold focus:ring-0"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            to="/reports"
          >
            Reports
          </NavLink>
          <NavLink
            className="text-base font-semibold focus:ring-0"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            to="/issues"
          >
            Issues
          </NavLink>
          <NavLink
            className="text-base font-semibold focus:ring-0"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            to="/run-audit"
          >
            Run Audit
          </NavLink>
          <NavLink
            className="text-base font-semibold focus:ring-0"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            to="/settings"
          >
            Settings
          </NavLink>
        </div>
        <a
          className="px-4 py-2 border-2 border-solid border-gray-700 rounded text-gray-700 no-underline font-semibold hover:text-white hover:bg-gray-700 transition-colors duration-300"
          href="#"
        >
          Give A Feedback
        </a>
      </div>
    </div>
  );
}

export default Header;
