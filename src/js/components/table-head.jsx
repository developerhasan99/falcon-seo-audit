const TableHead = ({ headings, top }) => {
  return (
    <thead>
      <tr>
        {headings.map((heading, index) => (
          <th
            style={{ top: top }}
            scope="col"
            className={`px-4 py-3 border border-solid border-gray-300 border-l-0 sticky bg-gray-200 z-10 ${
              index === 0 ? "border-l" : ""
            }`}
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
