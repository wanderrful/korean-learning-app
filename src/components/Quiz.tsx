import * as React from "react";
import { Component, ChangeEvent, KeyboardEvent } from "react";
import { Panel, Button, FormControl, ListGroup, ListGroupItem, Glyphicon, Popover, Overlay, ProgressBar, Table, FormGroup } from "react-bootstrap";

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
            wrongGuesses: [],
        };

        // Bind event handlers
        this.onUpdateChildText = this.onUpdateChildText.bind(this);
        this.onEvaluateResponse = this.onEvaluateResponse.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    // Getter functions
    get bHasCompletedChallenges(): boolean {
        const { currentQuestionID } = this.state;
        const { challenges } = this.props;

        return (currentQuestionID === challenges.length);
    }
    get bHasAttemptedGuess(): boolean {
        const {wrongGuesses} = this.state;
        return (wrongGuesses.length > 0);
    }
    get progressPercentage(): number {
        const {currentQuestionID} = this.state;
        const {challenges} = this.props;
        return ( currentQuestionID / challenges.length * 100 );
    }
    get progressLabel(): string {
        const {currentQuestionID} = this.state;
        const {challenges} = this.props;
        return (currentQuestionID > 0) ? `${currentQuestionID} of ${challenges.length}` : "";
    }
    get validationState(): IValidationState {
        const {Response_className} = this.state;
        let result: IValidationState;
        
        switch (Response_className) {
            case "Response_correct":
                result = "success";
                break;
            case "Response_wrong":
                result = "error";
                break;
            default:
                result = null;
                break;
        }
        
        return result;
    }

    // Event handler functions
    onUpdateChildText(e: ChangeEvent<HTMLInputElement & EventTarget & FormControl>): void {
        this.setState({
            childText: e.target.value,
            Response_className: "Response_normal",
        });
    }
    onKeyDown(e: KeyboardEvent<HTMLInputElement & EventTarget & FormControl>): void {
        if (e.key === "Enter") {
            this.onEvaluateResponse();
        }
    }
    onEvaluateResponse() {
        const {childText, currentQuestionID} = this.state;
            const {challenges} = this.props;
            
            const given: string = childText.trim().toLowerCase();
            const actualAnswers: Array<string> = challenges[currentQuestionID].word_en;
            
            if (given) {
                if (actualAnswers.indexOf(given) !== -1) {
                    // Correct answer!
                    if (!this.bHasCompletedChallenges) {
                        this.setState({
                            childText: "",
                            Response_className: "Response_correct",
                            currentQuestionID: currentQuestionID + 1,
                            wrongGuesses: [],
                        });
                    }
                } else {
                    // Wrong answer!
                    const {wrongGuesses} = this.state;
                    let temp = wrongGuesses;
                    temp.unshift(given);
                    if (temp.length > 3) {
                        temp.pop();
                    }
                    this.setState({
                        childText: "",
                        Response_className: "Response_wrong",
                        wrongGuesses: temp,
                    });
                }

                // Reset the input field's class name after the animation finishes
                setTimeout(() => { 
                    this.setState({Response_className: "Response_normal"})
                }, 1200);
            }
    }

    // Rendering helper functions
    renderPostQuiz() {
        const {challenges} = this.props;
        return (
            <div className="Quiz">
                <p className="CheckmarkAnimation">
                    <Glyphicon glyph="plus" />
                </p>
                <p>
                    All questions have been answered correctly!
                </p>
                <div className="post-quiz-table">
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Korean</th>
                                <th>English</th>
                            </tr>
                        </thead>
                        <tbody>
                        {challenges.map( x => {
                            return (
                                <tr>
                                    <td>{x.id}</td>
                                    <td>{x.word_kr[0]}</td>
                                    <td>{x.word_en[0]}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
    renderQuiz() {
        return (
            <div className="Quiz">
                <h3>
                        Vocabulary Quiz
                </h3>

                <fieldset className="QueryContainer">
                    <legend className="question-number">
                        {this.bHasAttemptedGuess &&
                            <ProgressBar 
                                active 
                                bsStyle="success" 
                                now={this.progressPercentage} 
                                label={this.progressLabel} 
                            />
                        }
                    </legend>

                    <p>
                        {this.renderQuery()}
                    </p>
                    
                    {this.bHasAttemptedGuess && (
                        <p>
                            {this.renderPreviousGuesses()}
                        </p>
                    )}
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
                    {challenges[currentQuestionID].word_kr[0]}
                </p>

                <FormGroup
                    validationState={this.validationState}
                >
                    <FormControl 
                        type="text" 
                        id="guess-bar"
                        className={Response_className}
                        autoFocus={true}
                        value={childText}
                        placeholder="Press Enter to submit"
                        onChange={this.onUpdateChildText}
                        onKeyDown={this.onKeyDown}
                    />
                    <FormControl.Feedback />

                    
                    
                    <Overlay
                        show={this.bHasAttemptedGuess}
                        target={document.getElementById("guess-bar")}
                    >
                        <Popover
                            placement="right"
                            positionLeft={5}
                            title="Hint"
                        >
                            {challenges[currentQuestionID].hint}
                        </Popover>
                    </Overlay>
                </FormGroup>

                <Button
                    onClick={this.onEvaluateResponse}
                    bsStyle="xs"
                >
                    Submit
                </Button>
            </div>
        );
    }
    renderPreviousGuesses() {
        const {wrongGuesses} = this.state;
        return (
            <p className="wrong_guesses">
                <Panel bsStyle="info">
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