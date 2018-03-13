import * as React from "react";
import { FormControl } from "react-bootstrap";

import "../styles/Quiz.css";



interface Quiz_S {
    childText: string,
    Response_className: string,
    currentQuestionID: number,
}
interface Quiz_P {
    challenges: Array<Challenge>,
}



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
    onUpdateChildText(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            ... this.state,
            childText: e.target.value,
            Response_className: "Response_normal",
        });
    }
    onEvaluateResponse(e: React.KeyboardEvent<FormControl & HTMLInputElement>) {
        if (e.key === "Enter") {
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
        const {currentQuestionID} = this.state;
        const {challenges} = this.props;

        return (
            <div className="Quiz">
                <fieldset className="QueryContainer">
                    <legend className="QuestionCount">
                        Question {currentQuestionID + 1} of {challenges.length}
                    </legend>
                    {this.renderQuery()}
                </fieldset>
            </div>
        );
    }
    renderQuery() {
        const {challenges} = this.props;
        const {childText, Response_className, currentQuestionID} = this.state;
        return(
            <div>
                <p className="Query">
                    {challenges[currentQuestionID].query}
                </p>

                <input 
                    type="text" 
                    className={Response_className}
                    autoFocus={true}
                    value={childText}
                    onChange={this.onUpdateChildText}
                    onKeyDown={this.onEvaluateResponse}
                />
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