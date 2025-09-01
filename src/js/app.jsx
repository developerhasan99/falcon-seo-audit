import "../css/tailwind.css"; // Import Tailwind styles
import "react-toastify/ReactToastify.min.css";

import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <AppRoutes />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </HashRouter>
    {/* Devtools only in development */}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

// Render audit report page
const dashboardPageContainer = document.getElementById("fsa-main-page");

if (dashboardPageContainer) {
  const root = ReactDOM.createRoot(dashboardPageContainer);
  root.render(<App />);
}
