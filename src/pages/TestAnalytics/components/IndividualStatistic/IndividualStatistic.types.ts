import { type AnswersType } from 'types/answers.types';
import { type TestType } from 'types/tests.types';

export type IndividualStatisticType = {
    answers: AnswersType[];
    test: TestType;
};
