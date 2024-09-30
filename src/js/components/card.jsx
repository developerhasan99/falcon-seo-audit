import React from "react";

function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded mt-8 border border-solid border-gray-200">
      <div>{children}</div>
    </div>
  );
}

export default Card;
