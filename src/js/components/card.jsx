import React from "react";
import { twMerge } from "tailwind-merge";

function Card({ className, children }) {
  return (
    <div
      className={twMerge(
        "bg-white border border-gray-200 shadow-2xs rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
