import { useEffect, useState } from "react";

import Card from "../../components/card";
import CompletedStatus from "./completed-status";
import DefaultStatus from "./default-status";
import FalconLoader from "../../components/falcon-loader";
import Progress from "./progress";
import axios from "../../utils/axios";
import { useStore } from "../../store/index";
import { useAudit } from "../../hooks/useAudit";

function RunAudit() {
  const auditStatus = useStore((state) => state.auditStatus);
  const setAuditStatus = useStore((state) => state.setAuditStatus);
  const [isInitiating, setIsInitiating] = useState(false);
  const { isLoading, data, error } = useAudit();

  const runAudit = async () => {
    try {
      setIsInitiating(true);
      await axios.get("/audit/initiate", {
        params: {
          domain: new URL(falcon_seo_obj.site_url).hostname,
        },
      });
      setAuditStatus("running");
    } catch (error) {
      console.error(error);
    } finally {
      setIsInitiating(false);
    }
  };

  return (
    <>
      <h2 className="my-6 text-xl font-bold">Run new audit:</h2>
      {isLoading ? (
        <FalconLoader loadingText="Loading Data..." />
      ) : (
        <Card>
          <div className="flex flex-col items-center gap-8 my-12">
            {auditStatus === "default" && (
              <DefaultStatus runAudit={runAudit} isInitiating={isInitiating} />
            )}

            {auditStatus === "initiating" && (
              <FalconLoader loadingText="Initiating audit..." />
            )}

            {auditStatus === "running" && <Progress auditId={data.id} />}

            {auditStatus === "completed" && (
              <CompletedStatus
                runAudit={runAudit}
                isInitiating={isInitiating}
              />
            )}
          </div>
        </Card>
      )}
    </>
  );
}

export default RunAudit;
