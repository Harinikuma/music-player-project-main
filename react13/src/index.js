import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { UserProvider } from './UserContext';

// ✅ Suppress third-party script errors
window.onerror = function (message, source, lineno, colno, error) {
  if (message === "Script error.") {
    console.warn("Suppressed a script error from a third-party script.");
    return true;
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <UserProvider> */}
    <App />
    {/* </UserProvider> */}
  </React.StrictMode>
);

// Performance reporting
reportWebVitals();
