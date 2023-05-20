import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { type LoginFormType } from 'forms/../pages/HomePage/components/LoginForm/LoginForm.type';

import { type TypeOrNull } from 'types/general.types';

import { db } from '../firebase';

import { type RegistrationDataType } from 'forms/../pages/HomePage/components/RegistrationForm/RegistrationForm.types';

type initialStateType = {
    isAuth: boolean;
    user: TypeOrNull<RegistrationDataType>;
    error: boolean;
    registerSuccess: boolean;
};

const initialState: initialStateType = {
    isAuth: false,
    user: null,
    error: false,
    registerSuccess: false,
};

export const registerAccount = createAsyncThunk(
    'registerAccount',
    async (data: RegistrationDataType, thunkAPI) => {
        const users = collection(db, 'users');
        let isUserAdded = false;
        await getDocs(users).then((response) => {
            response.docs.forEach((doc) => {
                const { email } = doc.data() as RegistrationDataType;
                if (data.email === email) {
                    thunkAPI.dispatch(toggleErrorThunk());
                    isUserAdded = true;
                }
            });
        });
        if (!isUserAdded) {
            await addDoc(users, data);
            await thunkAPI.dispatch(
                login({
                    email: data.email,
                    password: data.password,
                    rememberMe: true,
                })
            );
        }
    }
);

export const toggleErrorThunk = createAsyncThunk(
    'toggleErrorThunk',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(toggleError());
        setTimeout(() => {
            thunkAPI.dispatch(toggleError());
        }, 5000);
    }
);

export const login = createAsyncThunk('login', async (data: LoginFormType) => {
    let currUser: TypeOrNull<RegistrationDataType> = null;
    const users = collection(db, 'users');
    await getDocs(users).then((response) => {
        response.docs.forEach((doc) => {
            const { email, password } = doc.data() as RegistrationDataType;
            if (data.email === email && data.password === password)
                currUser = doc.data() as RegistrationDataType;
        });
    });
    if (currUser) {
        if (data.rememberMe) {
            localStorage.setItem('email', data.email);
            localStorage.setItem('password', data.password);
        }
        return currUser;
    }
    return currUser;
});

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        signOut: (state) => {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            state.isAuth = false;
            state.user = null;
            state.error = false;
            state.registerSuccess = false;
        },
        toggleError: (state) => {
            state.error = !state.error;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.isAuth = true;
            }
        });
    },
});

export const { signOut, toggleError } = authSlice.actions;

export default authSlice.reducer;
