function RadialProgress({ progress }) {
  return (
    <div className="relative w-12 h-12">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="7"
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
          strokeWidth="7"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray="251.2"
          strokeDashoffset={`calc(251.2px - (251.2px * ${progress}) / 100)`}
        ></circle>

        <text
          x="50"
          y="50"
          fontSize="30"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
}

export default RadialProgress;
