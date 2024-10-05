import axios from "./instance.js";

const fetchRecentAudits = async (setLoading, setRecentAudits) => {
  try {
    const response = await axios.get("/recent-audits");

    if (response.data.status === "success") {
      setRecentAudits(response.data.reports);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchRecentAudits;
