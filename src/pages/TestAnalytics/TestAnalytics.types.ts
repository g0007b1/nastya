import { type AnswersType } from 'types/answers.types';
import { type QuestionType } from 'types/tests.types';

export type AnalyticsAnswerType = {
    question: QuestionType;
    answers: AnswersType[];
    questionIndex: number;
};
