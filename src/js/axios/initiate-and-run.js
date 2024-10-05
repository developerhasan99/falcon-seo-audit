import axios from "./instance.js";
import fetchAuditStatus from "./fetch-audit-status.js";

async function initiateAndRun(setStatus, setJustCompleted) {
  setStatus("initiating");

  try {
    const response = await axios.get("/initiate-audit/");

    if (response.status === 200) {
      setStatus("running");

      const audit_id = response.data.audit_id;

      fetchAuditStatus(audit_id, setStatus, setJustCompleted);
      axios.post("/run-audit/", { audit_id }, { timeout: 0 });
    }
  } catch (error) {
    console.log(error);
  }
}

export default initiateAndRun;
