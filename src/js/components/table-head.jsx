const TableHead = ({ headings, top }) => {
  return (
    <thead>
      <tr>
        {headings.map((heading, index) => (
          <th
            style={{ top: top }}
            scope="col"
            className={`p-3 text-xs border border-solid border-gray-300 sticky bg-gray-100 z-10 ${
              index === 0 ? "border-l" : "border-l-0"
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
