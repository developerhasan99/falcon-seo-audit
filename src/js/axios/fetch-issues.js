import axios from "axios";

const fetchIssues = async (setLoading, setIssues) => {
  try {
    const response = await axios.get(ajaxurl + "?action=get_issues" + "&nonce=" + falcon_seo_obj.nonce);

    if (response.data.success === true) {

        console.log(response.data.data);
        
        setIssues(response.data.data);
        setLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchIssues;
