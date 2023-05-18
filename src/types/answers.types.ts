export type AnswerType = string | string[];

export type QuizAnswers = {
    hard: number;
    quality: number;
    underStand: number;
    possibilities: number;
    result: number;
    wishes: string;
    age?: number;
    sex?: boolean;
    email?: string;
};

export type AnswersType = {
    testId: string;
    answers: AnswerType[];
    quizAnswers: QuizAnswers;
    sex: boolean;
    age: number;
    time: number;
    userId: string;
    userEmail: string;
    points: number;
};
