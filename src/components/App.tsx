import * as React from "react";
import Parent_C from "./Parent_C";
import "../styles/App.css";



// TODO: use App_P for props after connecting this component to the Redux store!
class App extends React.Component<object, object> {
  challengeList: Array<Challenge> = [ // TODO: export this to a database and import here via props with Redux!
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

  componentWillMount() {
    // TODO: dispatch the async FETCH action to the reducer here (I think?)
  }

  render() {
    return (
      <div className="App">
        <Parent_C challenges={this.challengeList}/>
      </div>
    );
  }
}



export default App;
