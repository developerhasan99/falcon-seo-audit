import { useEffect, useState } from "react";
import Card from "../components/card";
import Header from "../sections/header";
import FalconLoader from "../components/falcon-loader";

function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [recentAudits, setRecentAudits] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch(falcon_seo_obj.api_url + "/recent-audits/", {
      headers: {
        "X-WP-Nonce": falcon_seo_obj.nonce,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setLoading(false);
          setRecentAudits(data.reports);
          console.log(data.reports);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="pr-2.5">
      <div className="pt-8 max-w-screen-xl mx-auto">
        <Header />
        <Card title="Falcon SEO audit report">
          {isLoading ? (
            <FalconLoader loadingText="Loading data..." />
          ) : (
            <>
              {recentAudits.length === 0 ? (
                <RunFirstAudit />
              ) : (
                <div>
                  <p>Last audit completed: 2022-01-01</p>
                  <p>Status: Successful</p>
                  <p>Total URLs audited: 100</p>
                  <p>Total URLs with errors: 5</p>
                  <p>Average SEO score: 90</p>

                  <h3>Recent reports:</h3>
                  <table className="border border-solid border-gray-200 rounded w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-gray-200">
                        <th scope="col" className="px-6 py-3">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Initiated at
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total URLs
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total Errors
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentAudits.map((audit) => (
                        <tr className="border-0 border-b border-solid border-gray-200">
                          <th
                            scope="row"
                            className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap"
                          >
                            {audit.id}
                          </th>
                          <td className="px-6 py-2">{audit.initiated_at}</td>
                          <td className="px-6 py-2">
                            <span
                              className={`inline-block px-4 py-1 rounded-full font-medium ${
                                audit.status === "pending"
                                  ? "bg-gray-200 text-gray-700"
                                  : audit.status === "running"
                                  ? "bg-sky-200 text-sky-700"
                                  : audit.status === "completed"
                                  ? "bg-green-200 text-green-700"
                                  : "bg-red-200 text-red-700"
                              }`}
                            >
                              {audit.status}
                            </span>
                          </td>
                          <td className="px-6 py-2">{audit.urls_count}</td>
                          <td className="px-6 py-2">5</td>
                          <td className="px-6 py-2">
                            <button className="px-6 py-2 border-2 border-solid border-gray-700 rounded-full font-semibold text-gray-700 no-underline hover:text-white hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;

function RunFirstAudit() {
  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <img
        className="size-28"
        src={falcon_seo_obj.asset_url + "empty-box.svg"}
        alt="Empty Box"
      />
      <h3>You did not run any audit yet!</h3>
      <a
        href="#"
        className="px-8 py-2.5 cursor-pointer border border-solid border-gray-700 rounded-full text-white text-base no-underline font-semibold bg-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 after:text-white active:text-white focus-within:text-white"
      >
        Run your first audit
      </a>
    </div>
  );
}
