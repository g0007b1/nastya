import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';

import { type TestType } from 'types/tests.types';

import { db } from '../../firebase';
import { selectUser } from '../../redux/auth.selectors';
import { store } from '../../redux/store';

type initialStateType = {
    tests: TestType[];
};

const initialState: initialStateType = {
    tests: [],
};

export const deleteTest = createAsyncThunk<string, string>(
    'deleteTest',
    async (arg) => {
        const docRef = doc(db, 'tests', arg);
        await deleteDoc(docRef);
        return arg;
    }
);

export const getUserTests = createAsyncThunk<TestType[], void>(
    'getUserTests',
    async (arg) => {
        const user = selectUser(store.getState());
        const q = query(
            collection(db, 'tests'),
            where('owner', '==', user?.email)
        );
        const querySnapshot = await getDocs(q);
        const testArray: TestType[] = [];
        querySnapshot.forEach((doc) => {
            const testObj = doc.data() as TestType;
            testObj.id = doc.id;
            testArray.push(testObj);
        });
        return testArray;
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
