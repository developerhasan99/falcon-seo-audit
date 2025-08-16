import {
  Check,
  FileJson2,
  Hammer,
  Heading1Icon,
  Image,
  KeyIcon,
  Link,
  Shapes,
  TextSearch,
} from "lucide-react";
import { useEffect, useState } from "react";

import BackButton from "../../components/back-button";
import FalconLoader from "../../components/falcon-loader";
import Overview from "./overview";
import { useParams } from "react-router-dom";

const reportToc = [
  {
    title: "Overview",
    icon: Shapes,
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

function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch link details
    }
  }, [id]);

  console.log(details);

  return (
    <>
      <h2 className="my-6 text-xl font-bold flex items-center gap-4">
        <BackButton />
        <span>Audit Result for: {"link"}</span>
      </h2>
      {isLoading ? (
        <FalconLoader loadingText="Loading audit details..." />
      ) : (
        <>
          {details ? (
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
              </div>
            </div>
          ) : (
            <div>Details not found</div>
          )}
        </>
      )}
    </>
  );
}

export default Details;
