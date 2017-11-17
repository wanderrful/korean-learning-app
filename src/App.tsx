import * as React from "react";
import "./App.css";



export interface Props {
  query: string,
  answer: string,
};
export interface AppState {
  currentContext: number,         // identifies the current container that the app should be rendering
};
export interface PracticeState {
  query: string,                  // the assigned query that we want to display
  answer: string,                 // the correct answer we are expecting
  response: string,               // the current text that the user has input into the text box
};



class App extends React.Component<object, AppState> {
  render() {
    return (
      <div className="main">
        <PracticeContainer query="Query" answer="Answer" />
      </div>
    );
  }
}



class PracticeContainer extends React.Component<Props, PracticeState> {
  render() {
    const query = this.props.query;
    const answer = this.props.answer;

    return (
      <div className="practice-container">
        <Query query={query} />
        <Response answer={answer} />
      </div>
    );
  }
}



class Query extends React.Component<{query: string}, object> {
  render() {
    const content: string = this.props.query;

    return (
      <div className="query">
        {content}
      </div>
    );
  }
}



class Response extends React.Component<{answer: string}, object> {
  render() {
    //const answer: string = this.props.answer;

    return (
      <div className="response">
        <input id="guess-content" type="text" />
        <input id="guess-submit" type="submit" />
      </div>
    );
  }
}



export default App;
