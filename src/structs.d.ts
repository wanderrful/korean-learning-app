interface Parent_S {
    childText: string,
    query: string,
    answer: string,
}
interface Parent_P {
    challenges: Array<Challenge>,
}

interface Child_P {
    query: string,
    content: string,
    onUpdateText(newText: string): void,
    onSubmitText(): void,
}

interface Challenge {
    query: string,
    answer: string,
}