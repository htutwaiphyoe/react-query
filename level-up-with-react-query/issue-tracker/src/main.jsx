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

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      useErrorBoundary: true,
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
          <ReactQueryDevtools />
        </QueryClientProvider>
      </React.StrictMode>,
      document.getElementById("root")
    );
  });
