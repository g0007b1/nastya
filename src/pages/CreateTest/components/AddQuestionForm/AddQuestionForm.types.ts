import {
    type UseFieldArrayRemove,
    type UseFormRegister,
} from 'react-hook-form';

import { type TestType } from 'types/tests.types';

export type AddQuestionFormType = {
    index: number;
    register: UseFormRegister<TestType>;
    remove: UseFieldArrayRemove;
    withPoints: boolean;
};
