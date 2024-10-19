import axios from "./instance.js";

const fetchSingleAudit = async (setLoading, auditId, setAudit, page, perPage, setTotalPage) => {
  if (auditId) {
    setLoading(true);
    try {
      const response = await axios.post("/get-single-audit/", {
        audit_id: auditId,
        page: page,
        per_page: perPage
      });

      const totalPage = Math.ceil(response.data.total_count / perPage);

      setAudit(response.data.audit);
      setTotalPage(totalPage);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
};

export default fetchSingleAudit;
