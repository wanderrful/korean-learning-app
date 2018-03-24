import * as React from "react";
import { Component, ChangeEvent, KeyboardEvent } from "react";
import { Panel, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";

import "../styles/Quiz.css";



interface Quiz_S {
    childText: string,
    Response_className: string,
    currentQuestionID: number,
    wrongGuesses: Array<string>,
}
interface Quiz_P {
    challenges: Array<Challenge>,
}



class Quiz extends Component<Quiz_P, Quiz_S> {
    constructor(props: Quiz_P) {
        super(props);

        this.state = {
            childText: "",
            Response_className: "Response_normal",
            currentQuestionID: 0,
            wrongGuesses: []
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
    onUpdateChildText(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            ... this.state,
            childText: e.target.value,
            Response_className: "Response_normal",
        });
    }
    onEvaluateResponse(e: KeyboardEvent<FormControl & HTMLInputElement>) {
        if (e.key === "Enter") {
            const {childText, currentQuestionID} = this.state;
            const {challenges} = this.props;
            
            const actualAnswer: string = challenges[currentQuestionID].word_en;
            
            if (childText.toLowerCase() === actualAnswer.toLowerCase()) {
                if (!this.bHasCompletedChallenges) {
                    this.setState({
                        ... this.state,
                        childText: "",
                        Response_className: "Response_correct",
                        currentQuestionID: currentQuestionID + 1,
                        wrongGuesses: [],
                    });
                }
            } else {
                const {wrongGuesses} = this.state;
                let temp = wrongGuesses;
                temp.push(childText);
                if (temp.length > 3) {
                    temp.shift();
                }
                this.setState({
                    ... this.state,
                    childText: "",
                    Response_className: "Response_wrong",
                    wrongGuesses: temp,
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
        const {currentQuestionID, wrongGuesses} = this.state;
        const {challenges} = this.props;

        return (
            <div className="Quiz">
                <fieldset className="QueryContainer">
                    <legend>
                        Question {currentQuestionID + 1} of {challenges.length}
                    </legend>
                    
                    {this.renderQuery()}

                    {(wrongGuesses.length > 0) &&
                        this.renderPreviousGuesses()
                    }
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
                    {challenges[currentQuestionID].word_kr}
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
    renderPreviousGuesses() {
        const {wrongGuesses} = this.state;
        return (
            <p className="wrong_guesses">
                <Panel bsStyle="danger">
                    <Panel.Heading><b>Wrong guesses</b></Panel.Heading>
                    <ListGroup className="test">
                        {wrongGuesses.map( x => (<ListGroupItem>{x}</ListGroupItem>) )}
                    </ListGroup>
                </Panel>
            </p>
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