import ReactDOM from "react-dom/client";
import "../css/tailwind.css"; // Import Tailwind styles
import Header from "./sections/header";

const AdminPageApp = () => {
  return (
    <div className="pr-2.5">
      <div className="pt-8 max-w-screen-xl mx-auto">
        <Header />
        <div className="bg-white p-6 rounded mt-8">
          <h2 className="m-0 mb-2">Homepage SEO Report</h2>
        </div>

        <div className="bg-white p-6 rounded mt-8">
          <h2 className="m-0 mb-2">WordPress In-house SEO Report</h2>
        </div>

        <div className="bg-white p-6 rounded mt-8">
          <h2 className="m-0 mb-2">User Agent Crawler SEO Report</h2>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("falcon-seo-audit-admin");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<AdminPageApp />);
}
