import Card from "../components/card";
import { useEffect, useState } from "react";
import FalconLoader from "../components/falcon-loader";
import Header from "../components/header";

function Audit() {
  // const [isUrlFetching, setUrlFetching] = useState(false);
  const [isInitiatingAudit, setInitiatingAudit] = useState(false);
  const [isAuditRunning, setAuditRunning] = useState(false);
  const [justCompletedURLs, setJustCompletedURLs] = useState([]);

  const updateStatus = (audit_id) => {
    const intervalId = setInterval(() => {
      fetch(falcon_seo_obj.api_url + "/get-audit-status/", {
        headers: {
          "X-WP-Nonce": falcon_seo_obj.nonce,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ audit_id }),
      })
        .then((response) => response.json())
        .then((data) => {
          setJustCompletedURLs(data.urls);
          if (data.status === "completed") {
            clearInterval(intervalId); // Clear the interval if audit is completed
            setAuditRunning(false);
          }
        });
    }, 2000);
  };

  const runAudit = async () => {
    setInitiatingAudit(true);

    try {
      const responser = await fetch(
        falcon_seo_obj.api_url + "/initiate-audit/",
        {
          headers: {
            "X-WP-Nonce": falcon_seo_obj.nonce,
          },
          method: "GET",
        }
      );

      const data = await responser.json();

      const audit_id = data.audit_id;

      if (audit_id) {
        setInitiatingAudit(false);
        setAuditRunning(true);
        updateStatus(audit_id);

        fetch(falcon_seo_obj.api_url + "/run-audit/", {
          headers: {
            "X-WP-Nonce": falcon_seo_obj.nonce,
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            audit_id: audit_id,
          }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const audit_id = falcon_seo_obj.running_audit_id
      ? falcon_seo_obj.running_audit_id
      : null;

    if (audit_id) {
      setAuditRunning(true);
      updateStatus(audit_id);
    }
  }, []);

  return (
    <div className="pr-2.5">
      <div className="pt-8 max-w-screen-xl mx-auto">
        <Header />
        <Card>
          <h2 className="mb-6 pb-4 border-0 border-b border-solid border-gray-200 text-base font-bold">
            Run Falcon SEO audit
          </h2>
          {isAuditRunning ? (
            <div>
              <div className="flex flex-col items-center mb-6">
                <FalconLoader loadingText="Auditing full site..." />
                <div className="bg-sky-100 border border-solid border-sky-400 rounded-lg max-w-screen-md p-4">
                  <h2 className="m-0 border-0 border-b border-solid border-sky-400 pb-4 mb-4 text-sky-500">
                    Progress...
                  </h2>
                  <p className="text-sky-500 mb-0">
                    In this audit process, the crawler continuously searches for
                    new URLs on every page, making it impossible to show exact
                    progress. However, we assure you the process will be
                    completed soon. 🍀 🙂
                  </p>
                </div>
                <p>
                  The audit process runs on the background, closing this
                  tab/window will not affect the process.
                </p>
              </div>
              {justCompletedURLs.length > 0 && (
                <div className="border border-solid border-gray-200 rounded mb-8">
                  <h3 className="m-0 bg-gray-200 py-2 px-4">
                    URLs that were just completed:
                  </h3>
                  <ul className="m-0 flex flex-col-reverse">
                    {justCompletedURLs.map((link, idx) => (
                      <li className="px-4 py-3 m-0 border-0 border-b border-dashed border-gray-200">
                        {idx + 1}.{" "}
                        <a href={link} target="_blank">
                          {link}
                        </a>
                        &#10138;
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div>
              {isInitiatingAudit ? (
                <FalconLoader loadingText="Initiating audit..." />
              ) : (
                <div className="flex flex-col items-center gap-10 mb-10">
                  <img
                    className="size-32"
                    src={falcon_seo_obj.asset_url + "falcon-icon.svg"}
                    alt="Falcon"
                  />
                  <div className="text-center">
                    <h2 className="m-0 mb-4">
                      Run a new SEO audit to see what needs improving!
                    </h2>
                    <p className="m-0">
                      This audit will be run in the background. So, it is not
                      necessary to stay in this page.
                    </p>
                  </div>
                  <button
                    onClick={() => runAudit()}
                    className="px-8 py-2.5 inline-flex gap-2 items-center cursor-pointer border border-solid border-gray-700 rounded-full text-white text-base no-underline font-semibold bg-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 after:text-white active:text-white focus-within:text-white"
                  >
                    <img
                      className="size-5"
                      src={falcon_seo_obj.asset_url + "falcon-icon.svg"}
                      alt="Falcon icon"
                    />
                    Run Audit
                  </button>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Audit;
