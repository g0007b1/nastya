import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';
import { apiPost } from 'api/api';

import { type TypeOrNull } from 'types/general.types';
import { type TestType } from 'types/tests.types';

import { selectUser } from '../../redux/auth.selectors';
import { store } from '../../redux/store';

type initialStateType = {
    test: TypeOrNull<TestType>;
};

const initialState: initialStateType = {
    test: null,
};

// http://localhost:3001/tests?owner=2

export const createTest = createAsyncThunk(
    'createTest',
    async (test: TestType) => {
        const testCopy = { ...test };
        const user = selectUser(store.getState());
        testCopy.owner = user ? user.id : 0;
        testCopy.withQuiz = true; // TODO
        await apiPost('/tests', testCopy);
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
