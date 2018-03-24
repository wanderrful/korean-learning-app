import * as React from "react";
import { Component } from "react";
import { Alert } from "react-bootstrap";

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
    fetch(`${process.env.BACKEND_URL}/api/words`, {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(json => this.setState({challenges: json.data}))
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
        <Alert bsStyle="danger">
          <strong>Hey there!</strong> This app is still in development!
        </Alert>

        <Quiz challenges={this.state.challenges}/>
      </div>
    );
  }
  renderLoading() {
    return (
        <p>
          Loading... ({this.state.challenges.length} words loaded)
        </p>
    );
  }

  render() {
    return (
      <div className="App">
        {(this.state.challenges.length > 0) ? this.renderApp() : this.renderLoading() }
      </div>
    );
  }
}



export default App;
