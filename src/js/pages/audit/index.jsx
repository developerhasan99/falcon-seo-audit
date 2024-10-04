import Card from "../../components/card";
import { useEffect, useState } from "react";
import FalconLoader from "../../components/falcon-loader";
import Header from "../../components/header";
import CheckIcon from "./check-icon";
import axios from "../../utils/axios";

function Audit() {
  const [status, setStatus] = useState("default");
  const [justCompleted, setJustCompleted] = useState([]);

  const runAudit = async () => {
    setStatus("initiating");

    try {
      const response = await axios.get("/initiate-audit/");

      if (response.status === 200) {
        setStatus("running");

        axios
          .post("/run-audit/", {
            audit_id: response.data.audit_id,
          })
          .then(() => {
            setStatus("completed");
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
            {(status === "default" || status === "completed") && (
              <>
                {status === "completed" ? (
                  <CheckIcon />
                ) : (
                  <img
                    className="size-28"
                    src={falcon_seo_obj.asset_url + "falcon-icon.svg"}
                    alt="Falcon"
                  />
                )}
                <div className="text-center">
                  <h2 className="text-lg font-bold mb-2">
                    {status === "completed"
                      ? "🎉 SEO Audit Completed Successfully!"
                      : "Run a new SEO audit to see what needs improving!"}
                  </h2>
                  <p className="text-base">
                    {status === "completed"
                      ? "Your audit is finished. Review the report to see key insights and improvements you can make."
                      : "This audit will be run in the background. So, it is not necessary to stay in this page."}
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <FalconButton
                    runAudit={runAudit}
                    text={status === "completed" ? "Run Again" : "Run Audit"}
                  />
                  {status === "completed" && (
                    <a
                      href="/wp-admin/admin.php?page=audit-report"
                      className="px-8 py-2.5 cursor-pointer border-2 border-solid border-gray-700 rounded-full bg-white text-base no-underline font-semibold text-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 after:text-white active:text-white focus-within:text-white"
                    >
                      View Report
                    </a>
                  )}
                </div>
              </>
            )}

            {status === "initiating" && (
              <FalconLoader loadingText="Initiating audit..." />
            )}

            {status === "running" && (
              <FalconLoader loadingText="Running audit..." />
            )}

            {justCompleted.length > 0 && (
              <div>
                <h3 className="text-base font-bold mb-3">Just completed:</h3>
                <table className="rounded w-full border-separate border-spacing-0 text-left">
                  <TableHead
                    headings={["S/L", "URL", "Status", "Title", "Content Type"]}
                    top="32px"
                  />

                  <tbody></tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Audit;

const FalconButton = ({ runAudit, text }) => {
  return (
    <button
      onClick={() => runAudit()}
      className="px-8 py-2.5 inline-flex gap-2 items-center cursor-pointer border border-solid border-gray-700 rounded-full text-white text-base no-underline font-semibold bg-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 after:text-white active:text-white focus-within:text-white"
    >
      <img
        className="size-5"
        src={falcon_seo_obj.asset_url + "falcon-icon.svg"}
        alt="Falcon icon"
      />
      {text}
    </button>
  );
};
