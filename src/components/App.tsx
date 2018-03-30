import * as React from "react";
import { Component } from "react";
import { Glyphicon } from "react-bootstrap";

import Quiz from "./Quiz";

import "../styles/App.css";



type AppState = {
  challenges: Array<Challenge>
};



// TODO: use App_P for props after connecting this component to the Redux store!
class App extends Component<object, AppState> {

  constructor(props) {
    super(props);
    this.state = {challenges: []};
  }

  componentDidMount() {
    // Query the back-end API for the quiz's word list
    fetch("https://kla-backend.herokuapp.com/api/words")
      .then(res => res.json())
      .then(x => this.setState({challenges: x.data}))
      .catch(err => console.error(err));

    // If the fetch messed up, use test data instead
    /*
    if (!this.challengeList) {
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
    */
  }

  renderApp() {
    return (        
      <div>
        <Quiz challenges={this.state.challenges}/>
      </div>
    );
  }
  renderLoading() {
    return (
        <div>
          <p>
            <Glyphicon glyph="plus" className="loading-spinner" />
          </p>
          <p>
            Loading... ({this.state.challenges.length} words loaded)
          </p>
        </div>
    );
  }

  render() {
    return (
      <div className="App">
        {(this.state.challenges.length > 0) ? this.renderApp() : this.renderLoading() }

        <footer>
          View the source on Github!
          <ul>
            <li><a href="https://github.com/wanderrful/korean-learning-app/">Front-end</a></li>
            <li><a href="https://github.com/wanderrful/kla-backend">Back-end</a></li>
            </ul>
        </footer>

        <div className="github-banner">
          <a href="https://github.com/wanderrful/korean-learning-app">
            <img src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" alt="Fork me on GitHub" />
          </a>
        </div>
      </div>
    );
  }
}



export default App;
