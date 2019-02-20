import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App";

import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./styles/index.css";


// Uncomment this code block for local demonstration purposes
// const testData: Array<Challenge> = [
//   {
//     query: "비밀",
//     answer: "secret",
//   },
//   {
//     query: "닭고기",
//     answer: "chicken",
//   },
//   {
//     query: "연필",
//     answer: "pencil",
//   }
// ];



registerServiceWorker();

ReactDOM.render(
  <App />,
  document.getElementById("root") as HTMLElement
);
