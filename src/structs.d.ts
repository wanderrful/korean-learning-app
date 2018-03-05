interface App_P {
    challenges?: Array<Challenge>;
}

interface Parent_S {
    childText: string,
    Response1_className: string,
    currentQuestionID: number,
}
interface Parent_P {
    challenges: Array<Challenge>,
}

interface Child_P {
    query: string,
    content: string,
    Response1_className: string,
    onUpdateText(newText: string): void,
    onSubmitText(): void,
}

interface Challenge {
    query: string,
    answer: string,
}