import * as React from "react";
import { Component, ChangeEvent, KeyboardEvent } from "react";
import { Panel, FormControl, ListGroup, ListGroupItem, Glyphicon, Popover, Overlay, ProgressBar } from "react-bootstrap";

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

    // Event handler functions
    onUpdateChildText(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            ... this.state,
            childText: e.target.value,
            Response_className: "Response_normal",
        });
    }
    onKeyDown(e: KeyboardEvent<FormControl & HTMLInputElement>): void {
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
            }
    }

    // Rendering helper functions
    renderPostQuiz() {
        return (
            <div className="Quiz">
                <p className="CheckmarkAnimation">
                    <Glyphicon glyph="plus" />
                </p>
                <p>
                    All questions have been answered correctly!
                </p>
            </div>
        );
    }
    renderQuiz() {
        const {wrongGuesses} = this.state;

        return (
            <div className="Quiz">
                <h3>
                        Vocabulary Quiz
                </h3>

                <fieldset className="QueryContainer">
                    <legend className="question-number">
                        <ProgressBar 
                            active 
                            bsStyle="success" 
                            now={this.progressPercentage} 
                            label={this.progressLabel} 
                        />
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
        const {childText, Response_className, currentQuestionID, wrongGuesses} = this.state;
        return(
            <div>
                <p className="Query">
                    {challenges[currentQuestionID].word_kr[0]}
                </p>

                <p>
                    <input 
                        type="text" 
                        id="guess-bar"
                        className={Response_className}
                        autoFocus={true}
                        value={childText}
                        onChange={this.onUpdateChildText}
                        onKeyDown={this.onKeyDown}
                    />

                    <p className="tip">
                        <i>Press Enter to submit</i>
                    </p>
                    
                    <Overlay
                        show={wrongGuesses.length > 0}
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
                </p>
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