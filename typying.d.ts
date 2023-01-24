type Option ={
    option: string;
    isCorrect: boolean;
}

export type QuestionModel ={
    question: string;
    options: Option[];
    imageUrl: string;
    additional: string;
    num: string;
}