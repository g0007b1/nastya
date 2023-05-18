import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';

import { type AnswersType } from 'types/answers.types';
import { type TypeOrNull } from 'types/general.types';
import { type TestType } from 'types/tests.types';

import { db } from '../../firebase';

type initialStateType = {
    answers: AnswersType[];
    test: TypeOrNull<TestType>;
};

const initialState: initialStateType = {
    answers: [],
    test: null,
};

export const getAnswers = createAsyncThunk<AnswersType[], string>(
    'getAnswers',
    async (arg) => {
        const q = query(collection(db, 'answers'), where('testId', '==', arg));
        const querySnapshot = await getDocs(q);
        const answersArray: AnswersType[] = [];
        querySnapshot.forEach((doc) => {
            answersArray.push(doc.data() as AnswersType);
        });
        return answersArray;
    }
);

export const getTestForAnalytics = createAsyncThunk<TestType, string>(
    'getTestForAnalytics',
    async (arg) => {
        const test = doc(db, 'tests', arg);
        const response = await getDoc(test);
        return response.data() as TestType;
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
