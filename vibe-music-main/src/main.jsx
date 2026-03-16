import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import AuthProvider from "./components/context/AuthContextApi";
import AudioContextProvider from "./components/context/AudioContextApi";

let root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <AudioContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AudioContextProvider>
  </AuthProvider>
);
