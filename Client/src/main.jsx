import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import { AnimatePresence } from "framer-motion";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatePresence>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </AnimatePresence>
    </BrowserRouter>
  </StrictMode>
);
