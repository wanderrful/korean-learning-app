interface Query_P {
    query: string,
    content: string,
    Response_className: string,
    onUpdateText(newText: string): void,
    onSubmitText(): void,
}

interface Challenge {
    word_kr: string,
    word_en: string,
}