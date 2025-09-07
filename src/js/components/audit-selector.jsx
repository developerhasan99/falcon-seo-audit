import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { useStore } from "../store/index";

const AuditSelector = ({ recentAudits }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null);
  const currentAudit = useStore((state) => state.currentAudit);
  const setCurrentAudit = useStore((state) => state.setCurrentAudit);
  const setAuditStatus = useStore((state) => state.setAuditStatus);

  useEffect(() => {
    // Set the default audit
    if (recentAudits.length > 0) {
      setCurrentAudit(recentAudits[0]);
    }

    // Check if any audit is running
    recentAudits.forEach((audit) => {
      if (audit.status === "running") {
        setAuditStatus("running");
      }
    });

    // Close the dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="px-3 mt-3">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="pl-3 pr-2 py-2 border border-gray-200 border-solid rounded-lg cursor-pointer flex items-center justify-between relative"
      >
        <div>
          <h3 className="font-semibold text-base">Recent Audits</h3>
          <p className="text-xs text-gray-400">
            {currentAudit.initiatedAt &&
              moment(currentAudit.initiatedAt).format("DD MMM YYYY hh:mm A")}
          </p>
        </div>
        <div>
          <ChevronsUpDownIcon className="shrink-0 size-6 stroke-1 text-gray-500" />
        </div>
        {isOpen && (
          <div
            ref={selectorRef}
            className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-md shadow-lg z-50 border border-gray-200"
          >
            {recentAudits.map((audit) => (
              <button
                key={audit.id}
                onClick={() => setCurrentAudit(audit)}
                className="w-full text-left px-4 py-2 text-sm flex items-center justify-between text-gray-700 hover:bg-gray-100"
              >
                <div>
                  <p className="font-semibold mb-1">
                    {moment(audit.initiatedAt).format("DD MMM YYYY hh:mm A")}
                  </p>
                  <span
                    className={twMerge(
                      "text-xs inline-block px-2 py-1 rounded-full bg-green-50 text-green-600",
                      audit.status === "completed"
                        ? "bg-green-50 text-green-600"
                        : "bg-yellow-50 text-yellow-600"
                    )}
                  >
                    {audit.status}
                  </span>
                </div>
                {audit.id === currentAudit.id && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditSelector;
