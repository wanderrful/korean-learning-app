import * as React from "react";
import * as ReactDOM from "react-dom";
import * as pg from "pg";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/index.css";



const pgClient = new pg.Client({
  connectionString: process.env.DATABASE_URL
});

const DB_TABLE_NAME: string = "db_wordList";
const DB_CREATE_TABLE: string = `CREATE TABLE IF NOT EXIST ${DB_TABLE_NAME} (query string, answer string)`;
const DB_RETRIEVE_WORDS: string = `SELECT * FROM ${DB_TABLE_NAME}`;

pgClient.query(DB_CREATE_TABLE);
pgClient.query(DB_RETRIEVE_WORDS, fn_initApp);



function fn_initApp(err: Error, result: pg.QueryResult): void {
  const wordList: Array<Challenge> = result.rows;

  ReactDOM.render(
    <App challenges={wordList} />,
    document.getElementById("root") as HTMLElement
  );
}



registerServiceWorker();
