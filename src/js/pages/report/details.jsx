import Card from "../../components/card";
import BackButton from "../../components/back-button";
import FalconLoader from "../../components/falcon-loader";
import {
  ChartPie,
  FileJson2,
  Hammer,
  Heading1Icon,
  Image,
  KeyIcon,
  LineChart,
  Link,
  TextSearch,
} from "lucide-react";

const reportToc = [
  {
    title: "Overview",
    icon: ChartPie,
  },
  {
    title: "Basic SEO",
    icon: LineChart,
  },
  {
    title: "Headings Analysis",
    icon: Heading1Icon,
  },
  {
    title: "Content Analysis",
    icon: TextSearch,
  },
  {
    title: "Keywords Analysis",
    icon: KeyIcon,
  },
  {
    title: "Image Analysis",
    icon: Image,
  },
  {
    title: "In-Page Links",
    icon: Link,
  },
  {
    title: "Schema Data",
    icon: FileJson2,
  },
  {
    title: "Technical Details",
    icon: Hammer,
  },
];

function Details({ isLoading, link, details, backToSingleAudit }) {
  return (
    <Card>
      <h2 className="mb-6 pb-4 border-0 border-b border-solid border-gray-200 text-lg font-bold flex items-center gap-4">
        <BackButton onClick={backToSingleAudit} />
        <span>Audit Result for: {link}</span>
      </h2>
      {isLoading ? (
        <FalconLoader loadingText="Loading audit details..." />
      ) : (
        <div className="grid grid-cols-6">
          <div className="col-span-1 pr-6 border-r border-solid border-gray-200">
            <div className="flex flex-col gap-2">
              {reportToc.map((item, index) => (
                <button
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-3 border border-solid rounded bg-gray-100 text-gray-700 font-semibold hover:text-white hover:bg-gray-700 transition-colors duration-300"
                >
                  <item.icon size={14} />
                  {item.title}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-5 pl-6">
            <h3 className="text-xl font-bold mb-3">Basic SEO:</h3>
            <h4 className="text-base font-bold mb-3">Robots tag:</h4>
            <h4 className="text-base font-bold mb-3">SEO title:</h4>
            <h4 className="text-base font-bold mb-3">Url Readability:</h4>
            <h4 className="text-base font-bold mb-3">SEO meta description:</h4>
            <h4 className="text-base font-bold mb-3">Language attribute:</h4>
            <h4 className="text-base font-bold mb-3">Hreflang usage:</h4>
            <h4 className="text-base font-bold mb-3">Canonical Url:</h4>

            <hr className="pb-6 mt-6" />
            <h3 className="text-xl font-bold mb-3">Headings Analysis:</h3>
            <h4 className="text-base font-bold mb-3">H1 tag:</h4>
            <h4 className="text-base font-bold mb-3">H2 - H6 tags:</h4>
          </div>
        </div>
      )}
    </Card>
  );
}

export default Details;
