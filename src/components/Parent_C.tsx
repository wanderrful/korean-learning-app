import * as React from "react";

import Child_C from "./Child_C";
import "../styles/App.css";

class Parent_C extends React.Component<Parent_P, Parent_S> {
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
        let actualAnswer: string = this.props.challenges[this.state.currentQuestionID].answer;
        if (response.toLowerCase() === actualAnswer.toLowerCase()) {
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
            });
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



export default Parent_C;