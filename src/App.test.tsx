import * as React from "react";
import * as ReactDOM from "react-dom";
import { Alert } from "react-bootstrap";

import App from "./components/App";



const testData: Array<Challenge> = [ // TODO: export this to a database and import here via props with Redux!
  {
    query: "비밀",
    answer: "secret",
  },
  {
    query: "닭고기",
    answer: "chicken",
  },
  {
    query: "연필",
    answer: "pencil",
  }
];

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App challenges={testData} />, div);
});

it("renders react-bootstrap without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Alert bsStyle="warning"> test </Alert>, div);
});