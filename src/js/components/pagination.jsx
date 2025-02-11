const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPagination = () => {
    const pagination = [];

    // Always show the first page
    pagination.push(1);

    // If the current page is greater than 4, show an ellipsis before
    if (currentPage > 4) {
      pagination.push("...");
    }

    // Calculate the start and end pages
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    // Add previous pages
    for (let i = start; i <= end; i++) {
      pagination.push(i);
    }

    // If the current page is less than totalPages - 3, show an ellipsis after
    if (currentPage < totalPages - 3) {
      pagination.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      pagination.push(totalPages);
    }

    return pagination.map((page, index) => {
      if (page === "...") {
        return (
          <span key={index} className="text-gray-500">
            ...
          </span>
        );
      }

      return (
        <button
          key={index}
          className={"px-3 py-2 border border-solid rounded bg-white text-gray-700 font-semibold hover:text-white hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-white"}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      );
    });
  };

  return <div className="flex items-center gap-2">{renderPagination()}</div>;
};

export default Pagination;
