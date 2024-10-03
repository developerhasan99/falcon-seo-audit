const updateStatus = (audit_id, setJustCompletedURLs, setAuditRunning) => {
  try {
    const response = axios.post("/get-audit-status/", { audit_id });

    if (response.status === 200) {
      setJustCompletedURLs(response.data.urls);

      if (response.data.status === "completed") {
        setAuditRunning(false);
        return;
      }

      updateStatus(audit_id, setJustCompletedURLs, setAuditRunning);
    }
  } catch (error) {
    console.log(error);
  }
};

export default updateStatus;
