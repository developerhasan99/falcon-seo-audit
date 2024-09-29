function BackButton({ onClick }) {
  return (
    <button
      onClick={() => onClick()}
      className="inline-flex items-center gap-2 px-4 py-2 border-0 rounded-full bg-gray-100 text-gray-700 no-underline font-semibold hover:text-white hover:bg-gray-700 transition-colors duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      <span>Back</span>
    </button>
  );
}

export default BackButton;
