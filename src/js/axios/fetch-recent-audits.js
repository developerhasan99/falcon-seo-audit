import axios from "axios";

const fetchRecentAudits = async (setLoading, setRecentAudits) => {
  try {
    const response = await axios.get(ajaxurl + "?action=get_recent_audits" + "&nonce=" + falcon_seo_obj.nonce);

    if (response.data.success === true) {
      setRecentAudits(response.data.data);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchRecentAudits;
