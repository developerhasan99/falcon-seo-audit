import React from "react";

function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded mt-8">
      <h2 className="m-0 mb-8 pb-4 border-0 border-b border-solid border-gray-200 text-xl">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

export default Card;
