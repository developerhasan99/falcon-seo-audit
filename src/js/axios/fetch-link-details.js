import axios from "axios";

const fetchLinkDetails = async (setLoading, singleLinkId, setDetails) => {
  if (singleLinkId) {
    setLoading(true);
    try {
      const response = await axios.post(ajaxurl + "?action=get_single_details" + "&nonce=" + falcon_seo_obj.nonce + "&link_id=" + singleLinkId);

      setDetails(response.data);
    } catch (error) {

      console.log("It is not working ");
      
      console.error(error);
    }
    setLoading(false);
  }
};

export default fetchLinkDetails;
