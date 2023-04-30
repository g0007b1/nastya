export type AnswerType = string | string[];

export type QuizAnswers = {
    hard: number;
    quality: number;
    underStand: number;
    possibilities: string;
    result: string;
};

export type AnswersType = {
    testId: number;
    answers: AnswerType[];
    quizAnswers: QuizAnswers;
    sex: boolean;
    age: number;
    time: number;
    userId: number;
    userEmail: string;
    points: number;
};
