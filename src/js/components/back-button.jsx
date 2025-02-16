import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ fallbackRoute = "/reports" }) => {
  const navigate = useNavigate();

  const goBack = () => {
    // Check if there's a previous page in history
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      // If no history, go to fallback route
      navigate(fallbackRoute);
    }
  };

  return (
    <button
      onClick={goBack}
      className="inline-flex items-center gap-2 pl-2 pr-3 py-2 text-sm border border-solid rounded bg-white text-gray-700 font-semibold hover:text-white hover:bg-gray-700 transition-colors duration-300"
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );
};

export default BackButton;
