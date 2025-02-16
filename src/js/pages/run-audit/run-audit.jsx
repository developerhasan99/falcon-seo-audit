import { useEffect, useState } from "react";

import Card from "../../components/card";
import CompletedStatus from "./completed-status";
import DefaultStatus from "./default-status";
import FalconLoader from "../../components/falcon-loader";
import Progress from "./progress";
import fetchAuditStatus from "../../axios/fetch-audit-status";
import initiateAndRun from "../../axios/initiate-and-run";

function RunAudit() {
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
    <>
      <h2 className="my-6 text-xl font-bold">Run new audit:</h2>
      <Card>
        <div className="flex flex-col items-center gap-8 my-12">
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
    </>
  );
}

export default RunAudit;
