import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGet } from 'api/api';

import { type TestType } from 'types/tests.types';

type initialStateType = {
    tests: TestType[];
};

const initialState: initialStateType = {
    tests: [],
};

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
    },
});

export default profilePageSlice.reducer;
