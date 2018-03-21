import * as React from "react";
import { Component } from "react";
import { Alert } from "react-bootstrap";

import Quiz from "./Quiz";

import "../styles/App.css";



interface App_P {
  challenges?: Array<Challenge>;
}



// TODO: use App_P for props after connecting this component to the Redux store!
class App extends Component<App_P, object> {
  challengeList: Array<Challenge>;

  componentWillMount() {
    const {challenges} = this.props;

    // TODO: dispatch the async FETCH action to the reducer here (I think?)
    if (challenges) {
      this.challengeList = challenges;
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

  renderApp() {
    return (        
      <div>
        <Alert bsStyle="danger">
          <strong>Hey there!</strong> This app is still in development!
        </Alert>

        <Quiz challenges={this.challengeList}/>
      </div>
    );
  }
  renderLoading() {
    return (
        "Loading..."
    );
  }

  render() {
    return (
      <div className="App">
        {(this.challengeList.length > 0) ? this.renderApp() : this.renderLoading() }
      </div>
    );
  }
}



export default App;
