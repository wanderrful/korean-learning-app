interface Parent_S {
    childText: string,
    query: string,
    answer: string,
    Response1: string,
    currentQuestionID: number,
}
interface Parent_P {
    challenges: Array<Challenge>,
}

interface Child_P {
    query: string,
    content: string,
    Response1: string,
    onUpdateText(newText: string): void,
    onSubmitText(): void,
}

interface Challenge {
    query: string,
    answer: string,
}