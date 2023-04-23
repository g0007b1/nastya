import { type Dispatch } from 'react';

import { type TestType } from 'types/tests.types';

export type TestStepType = {
    test: TestType;
    setActiveStep: Dispatch<number>;
};
