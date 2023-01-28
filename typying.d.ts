export interface Option {
    option: string;
    isCorrect: boolean;
}

export interface QuestionModel {
    question: string;
    options: Option[];
    imageUrl: string;
    additional: string;
    num: string;
}