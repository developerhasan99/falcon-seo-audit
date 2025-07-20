import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Card from "../../components/card";
import Table from "../../components/table";
import { formatDate, timeAgo } from "../../utils/date-utils";

// Sample data - replace with real API data
const sampleData = [
  {
    id: 1,
    url: "https://example.com",
    status: 200,
    title: "Example Domain",
    lastCrawled: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    links: 42,
    images: 15,
    wordCount: 1250,
    seoScore: 87,
  },
  {
    id: 2,
    url: "https://example.com/about",
    status: 200,
    title: "About Us - Example",
    lastCrawled: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    links: 18,
    images: 8,
    wordCount: 850,
    seoScore: 92,
  },
  {
    id: 3,
    url: "https://example.com/contact",
    status: 200,
    title: "Contact Us - Example",
    lastCrawled: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    links: 12,
    images: 3,
    wordCount: 620,
    seoScore: 78,
  },
  {
    id: 4,
    url: "https://example.com/blog",
    status: 200,
    title: "Blog - Example",
    lastCrawled: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    links: 35,
    images: 20,
    wordCount: 1500,
    seoScore: 95,
  },
];

const CrawledUrls = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = sampleData.filter(
    (item) =>
      item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusBadge = (status) => {
    const statusClass =
      status >= 400
        ? "bg-red-100 text-red-800"
        : status >= 300
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800";
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}
      >
        {status}
      </span>
    );
  };

  const getSeoScoreBadge = (score) => {
    const scoreClass =
      score >= 80
        ? "bg-green-100 text-green-800"
        : score >= 60
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${scoreClass}`}
      >
        {score}/100
      </span>
    );
  };

  return (
    <div className="space-y-6 my-6">
      <h2 className="text-xl font-bold">Crawled URLs</h2>

      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto justify-center">
              <Filter className="-ml-0.5 mr-2 h-4 w-4" />
              Filter
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto justify-center">
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table
            headers={[
              "URL",
              "Status",
              "Last Crawled",
              "Links",
              "Images",
              "Words",
              "SEO Score",
            ]}
          >
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {item.url}
                      </a>
                      <p className="text-xs text-gray-500 truncate">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-col">
                    <span>{formatDate(item.lastCrawled)}</span>
                    <span className="text-xs text-gray-400">
                      {timeAgo(item.lastCrawled)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.links}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.images}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.wordCount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getSeoScoreBadge(item.seoScore)}
                </td>
              </tr>
            ))}
          </Table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredData.length)}
                </span>{" "}
                of <span className="font-medium">{filteredData.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">First</span>
                  <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Last</span>
                  <ChevronsRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CrawledUrls;
