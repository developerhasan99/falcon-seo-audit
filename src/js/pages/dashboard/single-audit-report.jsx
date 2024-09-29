import { useEffect, useState } from "react";
import BackButton from "../../components/back-button";
import axios from "../../utils/axios";
import FalconLoader from "../../components/falcon-loader";

function SingleAuditReport({ singleAuditId, clearSingleAuditId }) {
  const [audit, setAudit] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchId, setLastFetchId] = useState(null);

  useEffect(() => {
    if (!lastFetchId || lastFetchId !== singleAuditId) {
      // Fetch the single audit data
      (async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`/get-single-audit`);
          setAudit(response.data);
          lastFetchId(singleAuditId);
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      })();
    }
  }, []);

  return (
    <div>
      <div className="flex gap-4 items-center mb-8">
        <BackButton onClick={clearSingleAuditId} />
        <h3 className="m-0">Viewing audit report for: #{singleAuditId}</h3>
      </div>
      {isLoading ? (
        <FalconLoader loadingText="Loading audit report..." />
      ) : (
        <div className="flex flex-col gap-6">Data will be shown here</div>
      )}
    </div>
  );
}

export default SingleAuditReport;
