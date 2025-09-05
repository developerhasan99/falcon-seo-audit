import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios.js";

export const useAudit = () => {
  const domain = new URL(falcon_seo_obj.site_url).hostname;
  return useQuery({
    queryKey: ["audits"],
    queryFn: () =>
      axios
        .get("/audit/recent-audits", {
          params: { domain },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
};
