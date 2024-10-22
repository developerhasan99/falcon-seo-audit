import axios from "axios";

const fetchLinkDetails = async (setLoading, singleLinkId, setDetails) => {
  if (singleLinkId) {
    setLoading(true);
    try {
      const response = await axios.post("/get-single-details/", {
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
