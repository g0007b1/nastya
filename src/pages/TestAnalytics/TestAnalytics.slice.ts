import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGet } from 'api/api';

import { type AnswersType } from 'types/answers.types';
import { type TypeOrNull } from 'types/general.types';
import { type TestType } from 'types/tests.types';

type initialStateType = {
    answers: AnswersType[];
    test: TypeOrNull<TestType>;
};
// answers?testId=1
const initialState: initialStateType = {
    answers: [],
    test: null,
};

export const getAnswers = createAsyncThunk<AnswersType[], number>(
    'getAnswers',
    async (arg) => {
        const { data } = await apiGet(`/answers?testId=${arg}`);
        return data;
    }
);

export const getTestForAnalytics = createAsyncThunk<TestType, number>(
    'getTestForAnalytics',
    async (arg) => {
        const { data } = await apiGet(`/tests/${arg}`);
        return data;
    }
);

const testAnalyticsSlice = createSlice({
    name: 'testAnalyticsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAnswers.fulfilled, (state, action) => {
            state.answers = action.payload;
        });
        builder.addCase(getTestForAnalytics.fulfilled, (state, action) => {
            state.test = action.payload;
        });
    },
});

export default testAnalyticsSlice.reducer;
