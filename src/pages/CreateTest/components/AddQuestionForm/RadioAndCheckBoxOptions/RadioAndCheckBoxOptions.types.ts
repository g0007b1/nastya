import { type UseFormRegister } from 'react-hook-form';

import { type TestType } from 'types/tests.types';

export type RadioAndCheckBoxOptionsType = {
    isCheckBox?: boolean;
    register: UseFormRegister<TestType>;
    parentIndex: number;
    withPoints: boolean;
};
