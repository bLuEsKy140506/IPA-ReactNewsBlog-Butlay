import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import datalocal from "./posts.json";
import "./index.css";

//this function will set the default value to local storage
//and to ensure it will not overwrite the existing modified values
if (localStorage.getItem("track_changes") === null) {
  window.localStorage.clear();
  datalocal.map((item) => {
    window.localStorage.setItem(item.id, JSON.stringify(item));
  });
} else {
  window.localStorage.setItem("track_changes", "changes");
}
// window.localStorage.clear();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
