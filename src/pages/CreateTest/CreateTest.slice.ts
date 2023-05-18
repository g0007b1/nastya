import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';
import { addDoc, collection } from 'firebase/firestore';

import { type TypeOrNull } from 'types/general.types';
import { type TestType } from 'types/tests.types';

import { db } from '../../firebase';
import { selectUser } from '../../redux/auth.selectors';
import { store } from '../../redux/store';

type initialStateType = {
    test: TypeOrNull<TestType>;
};

const initialState: initialStateType = {
    test: null,
};

export const createTest = createAsyncThunk(
    'createTest',
    async (test: TestType) => {
        const tests = collection(db, 'tests');
        const testCopy = { ...test };
        const user = selectUser(store.getState());
        testCopy.owner = user ? user.email : '';
        testCopy.withQuiz = true; // TODO
        await addDoc(tests, testCopy);
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
