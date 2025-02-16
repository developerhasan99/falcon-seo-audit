import { Square, Triangle } from "lucide-react";
import { useEffect, useState } from "react";

import Card from "../../components/card";
import FalconLoader from "../../components/falcon-loader";
import fetchIssues from "../../axios/fetch-issues";

export default function Issues() {
  const [isLoading, setLoading] = useState(true);
  const [issues, setIssues] = useState(null);

  useEffect(() => {
    fetchIssues(setLoading, setIssues);
    console.log("Fetch issues");
  }, []);

  return (
    <>
      <h2 className="my-6 text-xl font-bold">Issues from the last audit:</h2>
      {isLoading ? (
        <FalconLoader loadingText="Loading issues..." />
      ) : (
        <>
          <Card className="mb-4">
            <h3 className="px-6 py-4 font-semibold text-base border-b-4 border-red-500 border-solid">
              Errors
            </h3>
            <ErrorItem title="Pages don't have title tags" count={11} />
            <ErrorItem title="Pages have duplicate title tag" count={11} />
            <ErrorItem
              title="Pages have duplicate meta description"
              count={11}
            />
            <ErrorItem title="Pages have duplicate content" count={11} />
          </Card>
          <Card className="mb-4">
            <h3 className="px-6 py-4 font-semibold text-base border-b-4 border-orange-500 border-solid">
              Warnings
            </h3>
            <WarningItem title="Pages have duplicate title tag" count={11} />
            <WarningItem title="Pages have too long title tag" count={11} />
            <WarningItem title="Pages have to short title tag" count={11} />
            <WarningItem
              title="Pages have duplicate meta description"
              count={11}
            />
            <WarningItem
              title="Pages have to short meta description"
              count={11}
            />
            <WarningItem
              title="Pages have to short meta description"
              count={11}
            />
          </Card>
        </>
      )}
    </>
  );
}

const ErrorItem = ({ title, count }) => {
  return (
    <div className="flex gap-6 px-6 py-3 border-t border-solid items-center text-base hover:bg-gray-100 hover:cursor-pointer">
      <Triangle className="size-4 text-red-500" />
      <span className="mr-auto">{title}</span>
      <div className=" bg-red-500 text-white px-2 rounded-full text-sm">
        {count}
      </div>
    </div>
  );
};

const WarningItem = ({ title, count }) => {
  return (
    <div className="flex gap-6 px-6 py-3 border-t border-solid items-center text-base hover:bg-gray-100 hover:cursor-pointer">
      <Square className="size-4 text-orange-500" />
      <span className="mr-auto">{title}</span>
      <div className=" bg-orange-500 text-white px-2 rounded-full text-sm">
        {count}
      </div>
    </div>
  );
};
