import Card from "../components/card";
import { useEffect, useState } from "react";
import FalconLoader from "../components/falcon-loader";
import Header from "../components/header";
import { div } from "framer-motion/client";

function Audit() {
  const [auditStatus, setAuditStatus] = useState("default");
  const [justCompleted, setJustCompleted] = useState([]);

  const runAudit = async () => {
    setAuditStatus("initiating");

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
          <div className="flex flex-col items-center gap-10 mb-10">
            {auditStatus === "default" && (
              <>
                <img
                  className="size-28"
                  src={falcon_seo_obj.asset_url + "falcon-icon.svg"}
                  alt="Falcon"
                />
                <div className="text-center">
                  <h2 className="text-lg font-bold mb-2">
                    Run a new SEO audit to see what needs improving!
                  </h2>
                  <p className="text-base">
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
              </>
            )}

            {auditStatus === "initiating" && (
              <FalconLoader loadingText="Initiating audit..." />
            )}

            {auditStatus === "running" && (
              <FalconLoader loadingText="Running audit..." />
            )}

            {auditStatus === "completed" && (
              <>
                <div className="size-24 rounded-full border-4 border-solid border-green-500 flex items-center justify-center">
                  <svg
                    height="60px"
                    width="60px"
                    viewBox="0 0 512 512"
                    className="fill-green-500"
                  >
                    <path d="M469.402,35.492C334.09,110.664,197.114,324.5,197.114,324.5L73.509,184.176L0,254.336l178.732,222.172 l65.15-2.504C327.414,223.414,512,55.539,512,55.539L469.402,35.492z"></path>
                  </svg>
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-bold mb-2">
                    Run a new SEO audit to see what needs improving!
                  </h2>
                  <p className="text-base">
                    This audit will be run in the background. So, it is not
                    necessary to stay in this page.
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
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
                  <a
                    href="/audit/complete"
                    className="px-8 py-2.5 cursor-pointer border-2 border-solid border-gray-700 rounded-full bg-white text-base no-underline font-semibold text-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 after:text-white active:text-white focus-within:text-white"
                  >
                    View Report
                  </a>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Audit;
