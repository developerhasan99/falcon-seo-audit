import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPagination = () => {
        const pagination = [];
        
        // Always show the first page
        pagination.push(1);

        // If the current page is greater than 4, show an ellipsis before
        if (currentPage > 4) {
            pagination.push('...');
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
            pagination.push('...');
        }

        // Always show the last page
        if (totalPages > 1) {
            pagination.push(totalPages);
        }

        return pagination.map((page, index) => (
            <button
                key={index}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === currentPage}
                style={{
                    margin: '0 5px',
                    fontWeight: page === currentPage ? 'bold' : 'normal',
                }}
            >
                {page}
            </button>
        ));
    };

    return (
        <div>
            {renderPagination()}
        </div>
    );
};

export default Pagination;
