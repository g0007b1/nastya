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
    id: string; // auto
    withQuiz: boolean; // in thunk
    name: string; // +
    withPoints: boolean;
    description: string; // +
    owner: string; // in thunk
    questions: QuestionType[];
};
