import { Info, Check, X, Square } from "lucide-react";
import React, { useEffect, useState } from "react";
import DetailsEntryWrap from "../../components/details-entry-wrap";

const PageURLChecker = ({ pageUrl }) => {
  const [status, setStatus] = useState("not-available");
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    if (!pageUrl) {
      setStatus("not-available");
      setIssues(["No page URL provided"]);
      return;
    }

    const newIssues = [];
    let parsedURL;

    // Validate URL format
    try {
      parsedURL = new URL(pageUrl);
    } catch (error) {
      newIssues.push("Invalid URL format");
    }

    if (parsedURL) {
      // Check for underscores
      if (parsedURL.pathname.includes("_")) {
        newIssues.push(
          "URL contains underscores (_), use hyphens (-) for readability"
        );
      }

      // Check for length
      if (pageUrl.length > 100) {
        newIssues.push("URL is too long, consider shortening for better SEO");
      }

      // Check for special characters
      const specialCharRegex = /[^a-zA-Z0-9-/.]/;
      if (specialCharRegex.test(parsedURL.pathname)) {
        newIssues.push(
          "URL contains special characters, use only alphanumeric characters and hyphens"
        );
      }

      // Check for excessive parameters
      if (parsedURL.search.length > 50) {
        newIssues.push(
          "URL has too many query parameters, consider simplifying"
        );
      }
    }

    if (newIssues.length === 0) {
      setStatus("good");
    } else if (
      newIssues.some(
        (issue) =>
          issue.includes("underscores") || issue.includes("special characters")
      )
    ) {
      setStatus("warning");
    } else {
      setStatus("error");
    }

    setIssues(newIssues);
  }, [pageUrl]);

  const getStatusInfo = () => {
    switch (status) {
      case "good":
        return {
          color: "text-green-500",
          bgColor: "bg-green-500",
          message: "URL is well-structured and readable.",
          icon: Check,
        };
      case "warning":
        return {
          color: "text-orange-500",
          bgColor: "bg-orange-500",
          message: "URL has minor readability issues.",
          icon: Square,
        };
      case "error":
        return {
          color: "text-red-500",
          bgColor: "bg-red-500",
          message: "URL is not well-formed.",
          icon: X,
        };
      case "not-available":
      default:
        return {
          color: "text-gray-500",
          bgColor: "bg-gray-500",
          message: "No page URL provided.",
          icon: Info,
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <DetailsEntryWrap>
      <div className="flex gap-4 items-center">
        <statusInfo.icon
          className={`flex-shrink-0 size-5 ${statusInfo.color}`}
        />
        <div className="text-base font-semibold">Page URL</div>
      </div>
      <div className="col-span-3">
        <p className="text-base font-semibold">
          {pageUrl || "No page URL provided"}
        </p>
        {issues.length > 0 && (
          <div className="mt-2 space-y-1">
            {issues.map((issue, index) => (
              <div key={index} className="relative pl-3 text-sm">
                <span
                  className={`absolute top-1.5 left-0 block size-2 rounded-full ${statusInfo.bgColor}`}
                />
                <span>{issue}</span>
              </div>
            ))}
          </div>
        )}
        <p className="text-base relative pl-6 mt-2">
          <Info size={16} className="absolute top-1 left-0" />
          <span>
            {statusInfo.message} Learn more from{" "}
            <a
              className="hover:underline newtab"
              href="https://developers.google.com/search/docs/crawling-indexing/url-structure/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google
            </a>
            .
          </span>
        </p>
      </div>
    </DetailsEntryWrap>
  );
};

export default PageURLChecker;
