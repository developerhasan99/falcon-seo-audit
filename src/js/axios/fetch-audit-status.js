import axios from "./instance.js";

const fetchAuditStatus = async (audit_id, setStatus, setJustCompleted) => {
  try {
    const response = await axios.post("/get-audit-status/", { audit_id });

    if (response.status === 200) {
      // Update the UI
      setJustCompleted(response.data.urls);

      // Return if audit is completed
      if (response.data.status === "completed") {
        setStatus("completed");
        return;
      }

      // Run the function again
      fetchAuditStatus(audit_id, setStatus, setJustCompleted);
    }
  } catch (error) {
    console.log(error);
    fetchAuditStatus(audit_id, setStatus, setJustCompleted);
  }
};

export default fetchAuditStatus;
