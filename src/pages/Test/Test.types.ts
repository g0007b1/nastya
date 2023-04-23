import { type UseFormRegister } from 'react-hook-form';

import { type AnswersType } from 'types/answers.types';
import { type QuestionType } from 'types/tests.types';

export type TestGroupType = {
    questionIndex: number;
    question: QuestionType;
    register: UseFormRegister<AnswersType>;
};
