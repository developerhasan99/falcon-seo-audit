import { Info, Check, X, Square } from "lucide-react";
import React, { useEffect, useState } from "react";
import DetailsEntryWrap from "../../components/details-entry-wrap";

const SEORobotsChecker = ({ content }) => {
  const [status, setStatus] = useState("not-available");
  const [directives, setDirectives] = useState([]);
  const [issues, setIssues] = useState([]);

  // Common robots meta tag directives
  const VALID_DIRECTIVES = [
    "index",
    "noindex",
    "follow",
    "nofollow",
    "none",
    "noarchive",
    "nosnippet",
    "notranslate",
    "noimageindex",
    "max-snippet",
    "max-image-preview",
    "max-video-preview",
    "all",
  ];

  // Conflicting directive pairs
  const CONFLICTS = [
    ["index", "noindex"],
    ["follow", "nofollow"],
    ["all", "none"],
    ["all", "noindex"],
    ["all", "nofollow"],
  ];

  useEffect(() => {
    if (!content) {
      setStatus("not-available");
      setDirectives([]);
      setIssues(["No robots meta tag provided"]);
      return;
    }

    const directiveList = content
      .toLowerCase()
      .split(",")
      .map((d) => d.trim());
    setDirectives(directiveList);

    const newIssues = [];

    // Check for invalid directives
    const invalidDirectives = directiveList.filter((d) => {
      const baseDirective = d.split(":")[0].trim();
      return !VALID_DIRECTIVES.includes(baseDirective);
    });

    if (invalidDirectives.length > 0) {
      newIssues.push(`Invalid directive(s): ${invalidDirectives.join(", ")}`);
    }

    // Check for conflicting directives
    CONFLICTS.forEach(([dir1, dir2]) => {
      if (directiveList.includes(dir1) && directiveList.includes(dir2)) {
        newIssues.push(`Conflicting directives: ${dir1} and ${dir2}`);
      }
    });

    // Check for redundant directives
    const uniqueDirectives = new Set(directiveList);
    if (uniqueDirectives.size < directiveList.length) {
      newIssues.push("Contains redundant directives");
    }

    // Warning for noindex
    if (directiveList.includes("noindex")) {
      newIssues.push("Page will not be indexed by search engines");
    }

    // Warning for none
    if (directiveList.includes("none")) {
      newIssues.push("Most restrictive setting: no indexing or following");
    }

    setIssues(newIssues);

    // Set status based on issues
    if (newIssues.length === 0) {
      setStatus("good");
    } else if (
      newIssues.some(
        (issue) =>
          issue.includes("Invalid directive") ||
          issue.includes("Conflicting directives")
      )
    ) {
      setStatus("error");
    } else {
      setStatus("warning");
    }
  }, [content]);

  // Get status color and message
  const getStatusInfo = () => {
    switch (status) {
      case "good":
        return {
          color: "text-green-500",
          barColor: "bg-green-500",
          message: "Valid robots meta tag configuration.",
          icon: Check,
        };
      case "warning":
        return {
          color: "text-yellow-500",
          barColor: "bg-yellow-500",
          message: "Robots meta tag has potential concerns.",
          icon: Square,
        };
      case "error":
        return {
          color: "text-red-500",
          barColor: "bg-red-500",
          message: "Invalid robots meta tag configuration.",
          icon: X,
        };
      case "not-available":
        return {
          color: "text-red-500",
          barColor: "bg-red-500",
          message:
            "No robots meta tag found. Search engines will use default behavior.",
          icon: X,
        };
      default:
        return {
          color: "text-gray-500",
          barColor: "bg-gray-500",
          message: "Unable to determine robots meta tag status.",
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
        <div className="text-base font-semibold">Robots Meta Tag</div>
      </div>
      <div className="col-span-3">
        <p className="text-base font-semibold">
          {content || "No robots meta tag provided"}
        </p>

        <div className="mt-2 space-y-2">
          {/* Active Directives */}
          {directives.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {directives.map((directive, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-sm
                    ${
                      directive.includes("no") || directive === "none"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {directive}
                </span>
              ))}
            </div>
          )}

          {/* Issues List */}
          {issues.length > 0 && (
            <div className="mt-2 space-y-1">
              {issues.map((issue, index) => (
                <div key={index} className="relative pl-3 text-sm">
                  <span
                    className={`absolute top-1.5 left-0 block size-2 rounded-full ${statusInfo.barColor}`}
                  />
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          )}

          {/* Status Message */}
          <p className="text-base relative pl-6">
            <Info size={16} className="absolute top-1 left-0" />
            <span>
              {statusInfo.message}{" "}
              {status !== "not-available" && (
                <span>
                  Learn more from{" "}
                  <a
                    className="hover:underline newtab"
                    target="_blank"
                    href="https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag"
                    rel="noopener noreferrer"
                  >
                    Google
                  </a>
                  .
                </span>
              )}
            </span>
          </p>
        </div>
      </div>
    </DetailsEntryWrap>
  );
};

export default SEORobotsChecker;
