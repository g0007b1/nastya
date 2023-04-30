export type QuestionOptionType = {
    label: string;
    points: number;
};

export type QuestionTypeType =
    | 'multipleSelect'
    | 'select'
    | 'number'
    | 'string';

export type QuestionType = {
    question: string; // +
    type: QuestionTypeType; // +
    options: QuestionOptionType[];
};

export type TestType = {
    id: number; // auto
    withQuiz: boolean; // in thunk
    name: string; // +
    withPoints: boolean;
    description: string; // +
    owner: number; // in thunk
    questions: QuestionType[];
};
