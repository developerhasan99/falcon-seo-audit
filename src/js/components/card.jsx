import React from "react";
import { twMerge } from "tailwind-merge";

function Card({ className, children }) {
  return (
    <div className={twMerge("bg-white rounded border border-solid border-gray-200", className)}>
      <div>{children}</div>
    </div>
  );
}

export default Card;
