import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';

import { type TestType } from 'types/tests.types';

import { db } from '../../../../firebase';

type initialStateType = {
    tests: TestType[];
};

const initialState: initialStateType = {
    tests: [],
};

export const getAllTests = createAsyncThunk('getAllTests', async () => {
    const tests = collection(db, 'tests');
    const array: TestType[] = [];
    await getDocs(tests).then((response) => {
        response.docs.forEach((doc) => {
            const test = doc.data() as TestType;
            test.id = doc.id;
            array.push(test);
        });
    });
    return array;
});

const allTestsSlice = createSlice({
    name: 'allTestsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTests.fulfilled, (state, action) => {
            state.tests = action.payload;
        });
    },
});

export default allTestsSlice.reducer;
