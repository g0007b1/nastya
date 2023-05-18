import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';

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

import { db } from '../../firebase';
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

export const getTest = createAsyncThunk<TestType, string>(
    'getTest',
    async (arg) => {
        const test = doc(db, 'tests', arg);
        const response = await getDoc(test);
        const testObj = response.data() as TestType;
        testObj.id = arg;
        return testObj;
    }
);

export const sendAnswers = createAsyncThunk<void, QuizAnswers>(
    'sendAnswers',
    async (arg) => {
        const answers = collection(db, 'answers');

        const quizAnswers: QuizAnswers = {
            hard: arg.hard,
            quality: arg.quality,
            underStand: arg.underStand,
            possibilities: arg.possibilities,
            result: arg.result,
            wishes: arg.wishes,
        };

        const test = selectTest(store.getState());
        const answers2 = selectAnswers(store.getState());
        const user = selectUser(store.getState());
        const time = selectTime(store.getState());
        const totalPoints = selectTotalPoints(store.getState());

        if (test && answers2) {
            const answerObject: AnswersType = {
                testId: test.id,
                answers: answers2,
                quizAnswers,
                sex: user ? user.sex : arg.sex ? arg.sex : false,
                age: user ? user.age : arg.age ? arg.age : 0,
                time,
                userId: user ? user.email : arg.email ? arg.email : '',
                userEmail: user ? user.email : arg.email ? arg.email : '',
                points: totalPoints,
            };

            await addDoc(answers, answerObject);
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
    },
    extraReducers: (builder) => {
        builder.addCase(getTest.fulfilled, (state, action) => {
            state.test = action.payload;
        });
    },
});

export const { setTime, setAnswers } = testSlice.actions;

export default testSlice.reducer;
