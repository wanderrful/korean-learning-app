import * as React from "react";
import "./App.css";



class App extends React.Component<object,object> {
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

  render() {
    return (
      <div className="App">
        <Parent_C challenges={this.challengeList}/>
      </div>
    );
  }
}



class Parent_C extends React.Component<Parent_P,Parent_S> {
  constructor(props: Parent_P) {
    super(props);
    this.state = {
      childText: "",
      Response1_className: "Response1_normal",
      currentQuestionID: 0,
    };
    this.onUpdateChildText = this.onUpdateChildText.bind(this);
    this.onEvaluateResponse = this.onEvaluateResponse.bind(this);
  }
  onUpdateChildText(newText: string): void {
    this.setState({
      ... this.state,
      childText: newText,
      Response1_className: "Response1_normal",
    });
  }
  onEvaluateResponse() {
    let response: string = this.state.childText;
    if (response.toLowerCase() === this.props.challenges[this.state.currentQuestionID].answer.toLowerCase()) {
      if (!this.bHasCompletedChallenges()) {
        this.setState({
          ... this.state,
          childText: "",
          Response1_className: "Response1_correct",
          currentQuestionID: this.state.currentQuestionID + 1,
        });
      }
    } else {
      this.setState({
        ... this.state,
        childText: "",
        Response1_className: "Response1_wrong",
      })
    }
  }
  bHasCompletedChallenges(): boolean {
    return (this.state.currentQuestionID === this.props.challenges.length);
  }
  render() {
    if (this.bHasCompletedChallenges()) {
      return (
        <div className="Parent_C">
          <p className="checkmark-animation">
            ✔️ 
          </p>
          <p>
            All questions have been answered correctly!
          </p>
        </div>
      );
    } else {
      return (
        <div className="Parent_C">
          <fieldset className="Child_C">
            <legend>
              Question {this.state.currentQuestionID + 1} of {this.props.challenges.length}
            </legend>
            <Child_C 
              query={this.props.challenges[this.state.currentQuestionID].query}
              content={this.state.childText}
              Response1_className={this.state.Response1_className}
              onUpdateText={this.onUpdateChildText}
              onSubmitText={this.onEvaluateResponse}
            />
          </fieldset>
        </div>
      );
    }
  }
}



class Child_C extends React.Component<Child_P,object> {
  constructor(props: Child_P) {
    super(props);
    this.onChange_Response1 = this.onChange_Response1.bind(this);
    this.onEvent_Response1 = this.onEvent_Response1.bind(this);

  }
  onChange_Response1(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onUpdateText(e.target.value);
  }
  onEvent_Response1(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      this.props.onSubmitText();
    }
  }

  render() {
    return(
      <div className="">
          <p className="Query_C">
            {this.props.query}
          </p>
          <input 
            type="text" 
            className={this.props.Response1_className}
            autoFocus={true}
            value={this.props.content}
            onChange={this.onChange_Response1}
            onKeyDown={this.onEvent_Response1}
          />
      </div>
    );
  }
}



export default App;
