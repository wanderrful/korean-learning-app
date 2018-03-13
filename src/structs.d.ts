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