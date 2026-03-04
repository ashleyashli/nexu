import * as amplitude from "@amplitude/unified";
import { Identify } from "@amplitude/unified";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { App } from "./app";
import { ThemeToggle } from "./components/theme-toggle";
import "./index.css";
import { ThemeProvider, useTheme } from "./lib/theme-provider";

const amplitudeApiKey = import.meta.env.VITE_AMPLITUDE_API_KEY;
if (amplitudeApiKey) {
  amplitude.initAll(amplitudeApiKey, {
    analytics: { autocapture: true },
    sessionReplay: { sampleRate: 1 },
  });
  const env = new Identify();
  env.set("environment", import.meta.env.MODE);
  amplitude.identify(env);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const THEME_STORAGE_KEY = "nexu-theme";
const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme =
  storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : window.matchMedia(DARK_MEDIA_QUERY).matches
      ? "dark"
      : "light";

document.documentElement.dataset.theme = initialTheme;
document.documentElement.style.colorScheme = initialTheme;

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

function RootContent() {
  const { resolvedTheme } = useTheme();

  return (
    <BrowserRouter>
      <App />
      <ThemeToggle />
      <Toaster position="top-right" theme={resolvedTheme} />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RootContent />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
