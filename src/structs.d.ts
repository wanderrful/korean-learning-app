interface Query_P {
    query: string,
    content: string,
    Response_className: string,
    onUpdateText(newText: string): void,
    onSubmitText(): void,
}

interface Challenge {
    id: number,
    word_kr: Array<string>,
    word_en: Array<string>,
    hint: string,
}

type IValidationState = ("success" | "warning" | "error");