import * as React from "react";
import "./App.css";



class App extends React.Component<object,object> {
  challengeList: Array<Challenge> = [ // TODO: export this to a database!
    {
      query: "비밀",
      answer: "secret",
    },
    {
      query: "닭고기",
      answer: "chicken",
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
      query: "비밀",
      answer: "secret",
      Response1: "Response1_normal",
    };
    this.onUpdateChildText = this.onUpdateChildText.bind(this);
    this.onEvaluateResponse = this.onEvaluateResponse.bind(this);
  }
  onUpdateChildText(newText: string): void {
    this.setState({
      ... this.state,
      childText: newText,
      Response1: "Response1_normal",
    });
  }
  onEvaluateResponse() {
    let response: string = this.state.childText;
    if (response.toLowerCase() === this.state.answer.toLowerCase()) {
      this.setState({
        ... this.state,
        Response1: "Response1_correct",
      });
    } else {
      this.setState({
        ... this.state,
        Response1: "Response1_wrong",
      })
    }
  }
  render() {
    return (
      <div className="Parent_C">
        <Child_C 
          query={this.state.query}
          content={this.state.childText}
          Response1={this.state.Response1}
          onUpdateText={this.onUpdateChildText}
          onSubmitText={this.onEvaluateResponse}
        />
      </div>
    );
  }
}



class Child_C extends React.Component<Child_P,object> {
  currentQuestionID: number = 0;

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
      <div className="Child_C">
        <fieldset>
          <legend>
            Child_C
          </legend>
          <p className="Query_C">
            {this.props.query}
          </p>
          <input 
            type="text" 
            className={this.props.Response1}
            autoFocus={true}
            value={this.props.content}
            onChange={this.onChange_Response1}
            onKeyDown={this.onEvent_Response1}
          />
        </fieldset>
      </div>
    );
  }
}



export default App;
