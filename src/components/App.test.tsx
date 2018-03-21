import * as React from "react";
import { render } from "react-dom";
import { Alert } from "react-bootstrap";

import App from "./App";



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
  render(<App challenges={testData} />, div);
});

it("renders react-bootstrap without crashing", () => {
  const div = document.createElement("div");
  render(<Alert bsStyle="warning"> test </Alert>, div);
});