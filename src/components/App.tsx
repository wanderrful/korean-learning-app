import * as React from "react";
import * as pg from "pg";

import Parent_C from "./Parent_C";

import "../styles/App.css";



// TODO: use App_P for props after connecting this component to the Redux store!
class App extends React.Component<App_P, object> {
  challengeList: Array<Challenge>;

  componentWillMount() {
    // TODO: dispatch the async FETCH action to the reducer here (I think?)
    if (this.props.challenges) {
      this.challengeList = this.props.challenges;
    } else {
      /* TODO: debug and fix the undocumented pg DNS error
      const pgClient = new pg.Client({
        connectionString: process.env.DATABASE_URL
      });
      
      const DB_TABLE_NAME: string = "db_wordList";
      const DB_CREATE_TABLE: string = `CREATE TABLE IF NOT EXIST ${DB_TABLE_NAME} (query string, answer string)`;
      const DB_RETRIEVE_WORDS: string = `SELECT * FROM ${DB_TABLE_NAME}`;
      
      pgClient.query(DB_CREATE_TABLE);
      pgClient.query(DB_RETRIEVE_WORDS, this.fn_onReceiveWordList);
      */
    }
  }

  fn_onReceiveWordList(err: Error, result: pg.QueryResult): void {
    if (result.rowCount >= 0) {
      this.challengeList = [];
      result.rows.forEach( x => {
        this.challengeList.push(x);
      });
    } else {
      // Fill the challengeList with placeholder data
      this.challengeList = [
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
    }
  }

  render() {
    if (this.challengeList.length > 0) {
      return (
        <div className="App">
          <Parent_C challenges={this.challengeList}/>
        </div>
      );
    } else {
      return (
        <div className="App">
        Loading...
        </div>
      );
    }
  }
}



export default App;
