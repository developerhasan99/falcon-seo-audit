import Card from "../../../components/card";
import BackButton from "../../../components/back-button";
import FalconLoader from "../../../components/falcon-loader";

import {
  Shapes,
  FileJson2,
  Hammer,
  Heading1Icon,
  Image,
  KeyIcon,
  LineChart,
  Link,
  TextSearch,
} from "lucide-react";
import Overview from "./overview";

const reportToc = [
  {
    title: "Overview",
    icon: Shapes,
  },
  {
    title: "Basic SEO",
    icon: LineChart,
  },
  {
    title: "Headings",
    icon: Heading1Icon,
  },
  {
    title: "Content",
    icon: TextSearch,
  },
  {
    title: "Keywords",
    icon: KeyIcon,
  },
  {
    title: "Images",
    icon: Image,
  },
  {
    title: "Page Links",
    icon: Link,
  },
  {
    title: "Schema Data",
    icon: FileJson2,
  },
  {
    title: "Technical Data",
    icon: Hammer,
  },
];

function Details({ isLoading, link, details, backToSingleAudit }) {

  console.log(details);

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-xl font-bold flex items-center gap-4">
        <BackButton onClick={backToSingleAudit} />
        <span>Audit Result for: {link}</span>
      </h2>
      {isLoading ? (
        <FalconLoader loadingText="Loading audit details..." />
      ) : (
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-1">
            <div className="flex flex-col gap-1">
              {reportToc.map((item, index) => (
                <button
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-3 border border-solid border-gray-200 rounded text-base bg-white text-gray-600 font-semibold hover:text-gray-900 transition-colors"
                >
                  <item.icon size={18} />
                  {item.title}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-5">
            <Overview details={details} />
            <h4 className="text-base font-bold mb-3">Robots tag: 20</h4>
            <h4 className="text-base font-bold mb-3">SEO title: 30</h4>
            <h4 className="text-base font-bold mb-3">Url Readability: 20</h4>
            <h4 className="text-base font-bold mb-3">
              SEO meta description: 10
            </h4>
            <h4 className="text-base font-bold mb-3">Canonical Url: 10</h4>
            <h4 className="text-base font-bold mb-3">Language attribute: 5</h4>
            <h4 className="text-base font-bold mb-3">Hreflang usage: 5</h4>

            <hr className="pb-6 mt-6" />
            <h3 className="text-xl font-bold mb-3">Headings Analysis:</h3>
            <h4 className="text-base font-bold mb-3">H1 tag:</h4>
            <h4 className="text-base font-bold mb-3">H2 - H6 tags:</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
