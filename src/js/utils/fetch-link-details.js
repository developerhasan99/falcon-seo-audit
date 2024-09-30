import axios from "./axios.js";

const fetchLinkDetails = async (
  setLoading,
  auditId,
  singleLinkId,
  setDetails
) => {
  if (auditId) {
    setLoading(true);
    try {
      const response = await axios.post("/get-single-details/", {
        audit_id: auditId,
        link_id: singleLinkId,
      });

      setDetails(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
};

export default fetchLinkDetails;
