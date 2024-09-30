import Card from "../../components/card";
import FalconLoader from "../../components/falcon-loader";
import RunFirstAudit from "../../components/run-first-audit";

function RecentReports({ isLoading, recentAudits, showAudit }) {
  return (
    <Card>
      <h2 className="mb-6 pb-4 border-0 border-b border-solid border-gray-200 text-lg font-bold">
        Falcon SEO audit report
      </h2>
      {isLoading ? (
        <FalconLoader loadingText="Loading recent reports..." />
      ) : (
        <>
          {recentAudits.length > 0 ? (
            <>
              <div className="mb-6">
                <p>Last audit completed: 2022-01-01</p>
                <p>Status: Successful</p>
                <p>Total URLs audited: 100</p>
                <p>Total URLs with errors: 5</p>
                <p>Average SEO score: 90</p>
              </div>

              <h3 className="text-xl font-bold mb-3">Recent reports:</h3>
              <table className="border border-solid border-gray-200 rounded w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th scope="col" className="px-6 py-3">
                      S/L
                    </th>
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
                  {recentAudits.map((audit, idx) => (
                    <tr
                      key={audit.initiated_at}
                      className="border-0 border-b border-solid border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap"
                      >
                        {idx + 1}
                      </th>
                      <td className="px-6 py-2">{audit.id}</td>
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
                        <button
                          onClick={() => showAudit(audit.id)}
                          className="px-6 py-2 border-0 rounded-full font-semibold text-white no-underline bg-gray-600 hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <RunFirstAudit />
          )}
        </>
      )}
    </Card>
  );
}

export default RecentReports;
