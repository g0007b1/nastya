import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiDelete, apiGet } from 'api/api';

import { type TestType } from 'types/tests.types';

type initialStateType = {
    tests: TestType[];
};

const initialState: initialStateType = {
    tests: [],
};

export const deleteTest = createAsyncThunk<number, number>(
    'deleteTest',
    async (arg) => {
        await apiDelete(`/tests/${arg}`);
        return arg;
    }
);

export const getUserTests = createAsyncThunk<TestType[], number>(
    'getUserTests',
    async (arg) => {
        const { data } = await apiGet(`/tests?owner=${arg}`);
        return data;
    }
);

const profilePageSlice = createSlice({
    name: 'profilePageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserTests.fulfilled, (state, action) => {
            state.tests = action.payload;
        });
        builder.addCase(deleteTest.fulfilled, (state, action) => {
            const tests = [...state.tests];
            const deleteIndex = tests.findIndex(
                (test) => test.id === action.payload
            );
            tests.splice(deleteIndex, 1);
            state.tests = tests;
        });
    },
});

export default profilePageSlice.reducer;
