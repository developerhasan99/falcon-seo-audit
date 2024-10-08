import Card from "../../components/card";
import { useEffect, useState } from "react";
import FalconLoader from "../../components/falcon-loader";
import Header from "../../components/header";
import initiateAndRun from "../../axios/initiate-and-run";
import Progress from "./progress";
import DefaultStatus from "./default-status";
import CompletedStatus from "./completed-status";
import fetchAuditStatus from "../../axios/fetch-audit-status";

function Audit() {
  const [status, setStatus] = useState("default");
  const [justCompleted, setJustCompleted] = useState([]);

  const runAudit = () => {
    initiateAndRun(setStatus, setJustCompleted);
  };

  useEffect(() => {
    const audit_id = falcon_seo_obj.running_audit_id
      ? falcon_seo_obj.running_audit_id
      : null;

    if (audit_id) {
      setStatus("running");
      fetchAuditStatus(audit_id, setStatus, setJustCompleted);
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
            {status === "default" && <DefaultStatus runAudit={runAudit} />}

            {status === "initiating" && (
              <FalconLoader loadingText="Initiating audit..." />
            )}

            {status === "running" && (
              <FalconLoader loadingText="Running audit..." />
            )}

            {status === "completed" && <CompletedStatus runAudit={runAudit} />}

            {justCompleted.length > 0 && (
              <Progress justCompleted={justCompleted} />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Audit;
