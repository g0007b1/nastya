import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGet } from 'api/api';

import { type TestType } from 'types/tests.types';

type initialStateType = {
    tests: TestType[];
};

const initialState: initialStateType = {
    tests: [],
};

type TestsResponseType = {
    data: TestType[];
};

export const getAllTests = createAsyncThunk('getAllTests', async () => {
    const { data }: TestsResponseType = await apiGet('/tests');
    return data;
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
