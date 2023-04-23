import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';
import { apiPost } from 'api/api';

import { type TypeOrNull } from 'types/general.types';
import { type TestType } from 'types/tests.types';

type initialStateType = {
    test: TypeOrNull<TestType>;
};

const initialState: initialStateType = {
    test: null,
};

export const createTest = createAsyncThunk(
    'createTest',
    async (test: TestType) => {
        const testCopy = { ...test };
        testCopy.totalFemaleCount = 0;
        testCopy.totalMaleCount = 0;
        testCopy.totalPeopleCount = 0;
        testCopy.averageAge = 0;
        testCopy.owner = 0; // TODO
        testCopy.withQuiz = true;
        const response = await apiPost('/tests', testCopy);
        console.log(testCopy);
    }
);

const createTestSlice = createSlice({
    name: 'createTestSlice',
    initialState,
    reducers: {
        setTest: (state, action: PayloadAction<TestType>) => {
            state.test = action.payload;
        },
    },
});

export const { setTest } = createTestSlice.actions;

export default createTestSlice.reducer;
