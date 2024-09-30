import Card from "../../components/card";
import BackButton from "../../components/back-button";
import FalconLoader from "../../components/falcon-loader";

function Details({ isLoading, link, details, backToSingleAudit }) {
  return (
    <Card>
      <h2 className="mb-6 pb-4 border-0 border-b border-solid border-gray-200 text-lg font-bold flex items-center gap-2">
        <BackButton onClick={backToSingleAudit} />
        <span>Audit Result for: {link}</span>
      </h2>
      {isLoading ? (
        <FalconLoader loadingText="Loading audit details..." />
      ) : (
        <div>{details.title}</div>
      )}
    </Card>
  );
}

export default Details;
