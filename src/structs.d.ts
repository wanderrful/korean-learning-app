interface App_P {
    challenges?: Array<Challenge>;
}

interface Quiz_S {
    childText: string,
    Response_className: string,
    currentQuestionID: number,
}
interface Quiz_P {
    challenges: Array<Challenge>,
}

interface Query_P {
    query: string,
    content: string,
    Response_className: string,
    onUpdateText(newText: string): void,
    onSubmitText(): void,
}

interface Challenge {
    query: string,
    answer: string,
}