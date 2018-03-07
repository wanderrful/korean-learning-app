import * as React from "react";

import Query from "./Query";
import "../styles/Quiz.css";

class Quiz extends React.Component<Quiz_P, Quiz_S> {
    constructor(props: Quiz_P) {
        super(props);

        this.state = {
            childText: "",
            Response_className: "Response_normal",
            currentQuestionID: 0,
        };

        // Bind event handlers
        this.onUpdateChildText = this.onUpdateChildText.bind(this);
        this.onEvaluateResponse = this.onEvaluateResponse.bind(this);
    }

    // Getter functions
    get bHasCompletedChallenges(): boolean {
        const { currentQuestionID } = this.state;
        const { challenges } = this.props;

        return (currentQuestionID === challenges.length);
    }

    // Event handler functions
    onUpdateChildText(newText: string): void {
        this.setState({
            ... this.state,
            childText: newText,
            Response_className: "Response_normal",
        });
    }
    onEvaluateResponse() {
        let response: string = this.state.childText;
        let actualAnswer: string = this.props.challenges[this.state.currentQuestionID].answer;
        if (response.toLowerCase() === actualAnswer.toLowerCase()) {
            if (!this.bHasCompletedChallenges) {
                this.setState({
                    ... this.state,
                    childText: "",
                    Response_className: "Response_correct",
                    currentQuestionID: this.state.currentQuestionID + 1,
                });
            }
        } else {
            this.setState({
            ... this.state,
            childText: "",
            Response_className: "Response_wrong",
            });
        }
    }

    // Rendering helper functions
    renderPostQuiz() {
        return (
            <div className="Quiz">
                <p className="CheckmarkAnimation">
                    ✔️ 
                </p>
                <p>
                    All questions have been answered correctly!
                </p>
            </div>
        );
    }
    renderQuiz() {
        const {currentQuestionID, childText, Response_className} = this.state;
        const {challenges} = this.props;

        return (
            <div className="Quiz">
                <fieldset className="QueryContainer">
                    <legend>
                        Question {currentQuestionID + 1} of {challenges.length}
                    </legend>
                    <Query 
                        query={challenges[currentQuestionID].query}
                        content={childText}
                        Response_className={Response_className}
                        onUpdateText={this.onUpdateChildText}
                        onSubmitText={this.onEvaluateResponse}
                    />
                </fieldset>
            </div>
        );
    }

    
    
    render() {
        return (
            <div>
                {this.bHasCompletedChallenges ? this.renderPostQuiz() : this.renderQuiz()}
            </div>
        );
    }
}



export default Quiz;