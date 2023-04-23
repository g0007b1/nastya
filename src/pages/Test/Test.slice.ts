import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';
import { apiGet } from 'api/api';

import { type AnswerType, type QuizAnswers } from 'types/answers.types';
import { type TypeOrNull } from 'types/general.types';
import { type TestType } from 'types/tests.types';

type initialStateType = {
    test: TypeOrNull<TestType>;
    answers: TypeOrNull<AnswerType[]>;
    quizAnswers: TypeOrNull<QuizAnswers[]>;
    time: number;
};

const initialState: initialStateType = {
    test: null,
    answers: null,
    quizAnswers: null,
    time: 0,
};

export const getTest = createAsyncThunk<TestType, number>(
    'getTest',
    async (arg) => {
        const { data } = await apiGet(`/tests/${arg}`);
        console.log(data);
        return data;
    }
);

export const sendAnswers = createAsyncThunk<void, AnswerType>(
    'sendAnswers',
    async (arg) => {
        console.log(arg);
    }
);

const testSlice = createSlice({
    name: 'testSlice',
    initialState,
    reducers: {
        setTime: (state, action: PayloadAction<number>) => {
            state.time = action.payload;
        },
        setAnswers: (state, action: PayloadAction<AnswerType[]>) => {
            state.answers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTest.fulfilled, (state, action) => {
            state.test = action.payload;
        });
    },
});

export const { setTime, setAnswers } = testSlice.actions;

export default testSlice.reducer;
