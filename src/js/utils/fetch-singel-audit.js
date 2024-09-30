import axios from "./axios.js";

const fetchSingleAudit = async (setLoading, auditId, setAudit) => {
  if (auditId) {
    setLoading(true);
    try {
      const response = await axios.post("/get-single-audit/", {
        audit_id: auditId,
      });

      setAudit(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
};

export default fetchSingleAudit;
