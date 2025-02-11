function RadialProgress({ progress }) {
  return (
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="2"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          className={`stroke-current ${
            progress >= 80
              ? "text-green-500"
              : progress >= 50
              ? "text-yellow-300"
              : "text-red-500"
          }`}
          strokeWidth="4"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray="251.2"
          strokeDashoffset={`calc(251.2px - (251.2px * ${progress}) / 100)`}
        ></circle>
      </svg>
  );
}

export default RadialProgress;
