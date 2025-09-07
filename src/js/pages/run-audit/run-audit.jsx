import { useEffect, useState } from "react";

import Card from "../../components/card";
import CompletedStatus from "./completed-status";
import DefaultStatus from "./default-status";
import FalconLoader from "../../components/falcon-loader";
import Progress from "./progress";
import axios from "../../utils/axios";
import { useStore } from "../../store/index";
import { useAudit } from "../../hooks/useAudit";
import { useQuery } from "@tanstack/react-query";

function RunAudit() {
  const [justCompleted, setJustCompleted] = useState([]);
  const auditStatus = useStore((state) => state.auditStatus);
  const setAuditStatus = useStore((state) => state.setAuditStatus);
  const { isLoading, data, error } = useAudit();

  const runAudit = async () => {
    const response = await axios.get("/audit/initiate", {
      params: {
        domain: new URL(falcon_seo_obj.site_url).hostname,
      },
    });
    if (response.data?.success) {
      setAuditStatus("running");
    } else {
      setAuditStatus("default");
    }
  };

  useEffect(() => {
    if (auditStatus === "running") {
      const { data } = useQuery({
        queryKey: ["just-completed-urls"],
        queryFn: () =>
          axios
            .get("/audit/just-completed-urls", {
              params: {
                audit_id: data?.recentAudits?.[0]?.id,
              },
            })
            .then((res) => res.data),
        staleTime: 3 * 1000,
      });
    }
  }, [auditStatus]);

  return (
    <>
      <h2 className="my-6 text-xl font-bold">Run new audit:</h2>
      {isLoading ? (
        <FalconLoader loadingText="Loading Data..." />
      ) : (
        <Card>
          <div className="flex flex-col items-center gap-8 my-12">
            {auditStatus === "default" && <DefaultStatus runAudit={runAudit} />}

            {auditStatus === "initiating" && (
              <FalconLoader loadingText="Initiating audit..." />
            )}

            {auditStatus === "running" && (
              <FalconLoader loadingText="Running audit..." />
            )}

            {auditStatus === "completed" && (
              <CompletedStatus runAudit={runAudit} />
            )}

            {justCompleted.length > 0 && (
              <Progress justCompleted={justCompleted} />
            )}
          </div>
        </Card>
      )}
    </>
  );
}

export default RunAudit;
