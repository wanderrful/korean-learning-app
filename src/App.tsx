import * as React from "react";
import "./App.css";



export interface Props {
  query: string,
  answer: string
};



class App extends React.Component<Props, object> {
  render() {
    const query = this.props.query;
    const answer = this.props.answer;

    return (
      <div className="main">
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
