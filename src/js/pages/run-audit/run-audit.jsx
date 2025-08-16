import { useEffect, useState } from "react";

import Card from "../../components/card";
import CompletedStatus from "./completed-status";
import DefaultStatus from "./default-status";
import FalconLoader from "../../components/falcon-loader";
import Progress from "./progress";

function RunAudit() {
  const [status, setStatus] = useState("default");
  const [justCompleted, setJustCompleted] = useState([]);

  const runAudit = () => {
    // TODO: Initiate Audit here
  };

  useEffect(() => {}, []);

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
