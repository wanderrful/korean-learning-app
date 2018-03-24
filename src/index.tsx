import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App";

import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./styles/index.css";



// const testData: Array<Challenge> = [ // TODO: export this to a database and import here via props with Redux!
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