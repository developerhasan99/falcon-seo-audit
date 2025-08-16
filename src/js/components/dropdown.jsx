import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  direction = "down", // 'down' or 'up'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value) || {
    label: placeholder,
  };

  return (
    <div
      className={twMerge("relative inline-block text-left", className)}
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-between items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-2xs hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selectedOption.label}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              direction === "up"
                ? isOpen
                  ? "transform -rotate-180"
                  : ""
                : isOpen
                ? "transform rotate-180"
                : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          className={
            direction === "up"
              ? "absolute right-0 z-10 mb-1 bottom-full w-56 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              : "absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          }
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                  value === option.value
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span>{option.label}</span>
                {value === option.value && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
