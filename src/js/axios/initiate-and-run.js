import axios from "axios";
import fetchAuditStatus from "./fetch-audit-status.js";

async function initiateAndRun(setStatus, setJustCompleted) {
  setStatus("initiating");

  try {
    const response = await axios.get(ajaxurl + "?action=initiate_audit" + "&nonce=" + falcon_seo_obj.nonce);

    if (response.data.success === true) {
      setStatus("running");

      const audit_id = response.data.data;
      
      fetchAuditStatus(audit_id, setStatus, setJustCompleted);
    }
  } catch (error) {
    console.log(error);
  }
}

export default initiateAndRun;
