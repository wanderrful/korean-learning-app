// User-related structs
export interface SUserPreferences {
    bAllowMultipleChoice: boolean; // whether to allow the use of multiple choice-style questions when quizzing
    bAllowFreeResponse: boolean; // whether to allow the use of wanikani-style "free response" when quizzing
}
export interface SUserProfileData {
    UserName: string;
}



// Word-related structs
export interface SWordConfig {
    Word: SWord;
    Rating: number; // how well the user knows the word.
    LastEncounter: number; // when the user last encountered this word
    NextEncounter: number; // when the user is scheduled to next encounter this word
}

export interface SWord {
    Word_Korean: string;
    Word_English: string;
    Level: number;
    Description: string;
}