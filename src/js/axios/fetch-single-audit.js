import axios from "axios";

const fetchSingleAudit = async (
  setLoading,
  auditId,
  setAudit,
  page,
  perPage,
  setTotalCount
) => {
  if (auditId) {
    setLoading(true);
    try {
      const response = await axios.get(
        ajaxurl +
          "?action=get_single_audit" +
          "&nonce=" +
          falcon_seo_obj.nonce +
          "&audit_id=" +
          auditId +
          "&page=" +
          page +
          "&per_page=" +
          perPage
      );

      if (response.data.success === true) {
        const { total_count, audit } = response.data.data;

        setAudit(audit);
        setTotalCount(total_count);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
};

export default fetchSingleAudit;
