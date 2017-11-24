import * as React from "react";
import * as ReactDOM from "react-dom";
import * as pg from "pg";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/index.css";



const pgClient = pg.Client({});



pgClient.query("", fn_initApp);



function fn_initApp(): void {
  ReactDOM.render(
    <App />,
    document.getElementById("root") as HTMLElement
  );
}



registerServiceWorker();
