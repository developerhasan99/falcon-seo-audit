import Header from "../sections/header";
import Card from "../components/card";
import { useEffect, useState } from "react";
import FalconLoader from "../components/falcon-loader";

function Audit() {
  const [isUrlFetching, setUrlFetching] = useState(false);
  const [auditTopics, setAuditTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [auditUrls, setAuditUrls] = useState([]);

  useEffect(() => {
    const itemsToSelect = [];
    const selectedItems = [];
    falcon_seo_obj.post_types.forEach((postType) => {
      if (postType.name === "post" || postType.name === "page") {
        selectedItems.push(postType);
      } else {
        itemsToSelect.push(postType);
      }
    });

    falcon_seo_obj.taxonomies.forEach((taxonomy) => {
      if (taxonomy.name === "category") {
        selectedItems.push(taxonomy);
      } else {
        itemsToSelect.push(taxonomy);
      }
    });

    setAuditTopics(itemsToSelect);
    setSelectedTopics(selectedItems);
  }, []);

  const selectItem = (item) => {
    setAuditTopics(auditTopics.filter((topic) => topic.name !== item.name));
    setSelectedTopics([...selectedTopics, item]);
  };

  const removeItem = (item) => {
    setSelectedTopics(
      selectedTopics.filter((topic) => topic.name !== item.name)
    );
    setAuditTopics([...auditTopics, item]);
  };

  const fetchUrls = () => {
    fetch(falcon_seo_obj.api_url + "/get-audit-urls/", {
      headers: {
        "X-WP-Nonce": falcon_seo_obj.nonce,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ urlTopics: selectedTopics }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="pr-2.5">
      <div className="pt-8 max-w-screen-xl mx-auto">
        <Header />
        <Card title="Run the Falcon SEO audit">
          {isUrlFetching ? (
            <FalconLoader loadingText="Fetching Urls, please wait..." />
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <p className="m-0 mb-2">
                    Select post types and taxonomies to audit:
                  </p>
                  <div className="flex gap-2 flex-wrap p-4 border border-solid border-gray-200 rounded">
                    {auditTopics.map((item) => (
                      <button
                        onClick={() => selectItem(item)}
                        className="px-4 py-2 border-0 rounded text-gray-700 no-underline bg-gray-100 hover:text-white hover:bg-green-600 transition-colors duration-300 cursor-pointer"
                      >
                        {item.label} ({item.name})
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="m-0 mb-2">Selected:</p>
                  <div className="flex gap-2 flex-wrap p-4 border border-solid border-gray-200 rounded">
                    {selectedTopics.map((item) => (
                      <button
                        onClick={() => removeItem(item)}
                        className="px-4 py-2 bg-gray-100 rounded border-0 text-gray-700 no-underline hover:text-white hover:bg-red-600 transition-colors duration-300 cursor-pointer"
                      >
                        {item.label} ({item.name})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8 pb-2 flex justify-center">
                <button
                  onClick={() => fetchUrls()}
                  disabled={selectedTopics.length === 0}
                  className="px-6 py-2.5 cursor-pointer border border-solid border-gray-700 rounded text-white text-base  no-underline font-semibold bg-gray-700 hover:text-white hover:bg-gray-800 transition-colors duration-300 after:text-white active:text-white focus-within:text-white disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  Fetch URls
                </button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Audit;
