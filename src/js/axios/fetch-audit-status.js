import axios from "axios";

const fetchAuditStatus = async (audit_id, setStatus, setJustCompleted) => {
  try {
    const response = await axios.get(ajaxurl + "?action=get_audit_status" + "&nonce=" + falcon_seo_obj.nonce + "&audit_id=" + audit_id);

    if (response.data.success === true) {
      
      const {urls, status} = response.data.data;
      
      setJustCompleted(urls);

      // Return if audit is completed
      if (status === "completed") {
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
