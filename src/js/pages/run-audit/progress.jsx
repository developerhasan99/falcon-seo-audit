import { useQuery } from "@tanstack/react-query";
import FalconLoader from "../../components/falcon-loader";
import axios from "../../utils/axios";

function Progress({ auditId }) {
  const { data: justCompleted, isLoading } = useQuery({
    queryKey: ["justCompleted"],
    queryFn: async () =>
      axios
        .get("/audit/just-completed-urls", {
          params: {
            audit_id: auditId,
          },
        })
        .then((res) => res.data),
    refetchInterval: 3000,
  });

  console.log(justCompleted);
  return <div>Hello world</div>;

  return (
    <div className="px-6">
      <FalconLoader loadingText="Running audit..." />
      <h3 className="text-base font-bold mb-3">Just completed:</h3>
      <div className="inline-flex flex-col-reverse">
        {justCompleted?.map((audit, index) => (
          <p key={index} className="line-clamp-1">
            {index + 1}.{" "}
            <a
              href={audit.url}
              target="_blank"
              className="newtab hover:underline text-base"
            >
              {audit.url}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Progress;
