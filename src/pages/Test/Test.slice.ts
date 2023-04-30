import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';
import { apiGet, apiPost } from 'api/api';

import {
    selectAnswers,
    selectTest,
    selectTime,
    selectTotalPoints,
} from 'pages/Test/Test.selectors';
import { getPossibleTestPoints, getTestPoints } from 'pages/Test/Test.utils';
import {
    type AnswersType,
    type AnswerType,
    type QuizAnswers,
} from 'types/answers.types';
import { type TypeOrNull } from 'types/general.types';
import { type TestType } from 'types/tests.types';

import { selectUser } from '../../redux/auth.selectors';
import { store } from '../../redux/store';

type initialStateType = {
    test: TypeOrNull<TestType>;
    answers: TypeOrNull<AnswerType[]>;
    quizAnswers: TypeOrNull<QuizAnswers>;
    totalPoints: number;
    possibleTestPoints: number;
    time: number;
};

const initialState: initialStateType = {
    test: null,
    answers: null,
    quizAnswers: null,
    totalPoints: 0,
    possibleTestPoints: 0,
    time: 0,
};

export const getTest = createAsyncThunk<TestType, number>(
    'getTest',
    async (arg) => {
        const { data } = await apiGet(`/tests/${arg}`);
        return data;
    }
);

export const sendAnswers = createAsyncThunk<void, QuizAnswers>(
    'sendAnswers',
    async (arg) => {
        const test = selectTest(store.getState());
        const answers = selectAnswers(store.getState());
        const user = selectUser(store.getState());
        const time = selectTime(store.getState());
        const totalPoints = selectTotalPoints(store.getState());

        if (test && answers && user) {
            const answerObject: AnswersType = {
                testId: test.id,
                answers,
                quizAnswers: arg,
                sex: user.sex,
                age: user.age,
                time,
                userId: user.id,
                userEmail: user.email,
                points: totalPoints,
            };
            await apiPost('/answers', answerObject);
        }
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
            const test = { ...state.test };
            state.totalPoints = getTestPoints(test as TestType, action.payload);
            state.possibleTestPoints = getPossibleTestPoints(test as TestType);
        },
        setQuizAnswers: (state, action: PayloadAction<QuizAnswers>) => {
            state.quizAnswers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTest.fulfilled, (state, action) => {
            state.test = action.payload;
        });
    },
});

export const { setTime, setAnswers, setQuizAnswers } = testSlice.actions;

export default testSlice.reducer;
