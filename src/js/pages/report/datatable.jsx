import React from "react";
import { useTable, usePagination } from "react-table";

const DataTable = ({ columns, data, willBeDeleted }) => {
  const {
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <>
      <table className="rounded w-full border-separate border-spacing-0 text-left fixed-actions-width">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 border border-solid border-gray-300 border-l-0 sticky bg-gray-200 z-10 ${
                    index === 0 && "border-l"
                  }`}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {page.map((row) => {
            console.log(row);

            prepareRow(row);
            return (
              <tr
                key={row.id}
                className={`hover:bg-gray-100 ${
                  willBeDeleted === row.original.id ? "bg-red-100" : ""
                }`}
              >
                {row.cells.map((cell, index) => (
                  <td
                    key={index}
                    className={`px-4 py-3 border-0 border-solid border-gray-200 border-b border-r ${
                      index === 0 && "border-l"
                    }`}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <div className="flex gap-2 items-center">
          <span className="text-base">Items per page: </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-solid border-gray-300 px-4 py-2 rounded pr-8 font-semibold"
          >
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-base">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-1.5 border border-gray-300 font-semibold rounded hover:bg-gray-700 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-inherit disabled:hover:bg-inherit"
          >
            Prev
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-1.5 border border-gray-300 font-semibold rounded hover:bg-gray-700 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-inherit disabled:hover:bg-inherit"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
