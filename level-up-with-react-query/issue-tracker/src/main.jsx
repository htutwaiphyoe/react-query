import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { worker } from "@uidotdev/react-query-api";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./components/Error";
import FetchingIndicator from "./components/FetchingIndicator";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      useErrorBoundary: true,
      retry: false,
    },
  },
});

new Promise((res) => setTimeout(res, 100))
  .then(() =>
    worker.start({
      quiet: true,
      onUnhandledRequest: "bypass",
    })
  )
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <ErrorBoundary FallbackComponent={Error}>
              <div className="container">
                <App />
              </div>
            </ErrorBoundary>
          </BrowserRouter>
          <FetchingIndicator />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </React.StrictMode>,
      document.getElementById("root")
    );
  });
