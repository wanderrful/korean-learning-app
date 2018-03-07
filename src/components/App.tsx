import * as React from "react";
import { Alert } from "react-bootstrap";

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
      /* TODO: replace this deprecated back-end code with one that is compatible with create-react-app!
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

  render() {
    if (this.challengeList.length > 0) {
      return (        
        <div className="App">
          <Alert bsStyle="warning">
            <strong>Holy guacamole!</strong> Best check yo self, you're not looking too
            good.
          </Alert>

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
