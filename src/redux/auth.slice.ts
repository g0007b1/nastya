import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiPost } from 'api/api';
import { type LoginFormType } from 'forms/../pages/HomePage/components/LoginForm/LoginForm.type';

import { type TypeOrNull } from 'types/general.types';

import { type RegistrationDataType } from 'forms/../pages/HomePage/components/RegistrationForm/RegistrationForm.types';

type JsonServerLoginResponseType = {
    data: {
        accessToken: string;
        user: RegistrationDataType;
    };
};

type initialStateType = {
    isAuth: boolean;
    user: TypeOrNull<RegistrationDataType>;
    error: TypeOrNull<string>;
    registerSuccess: boolean;
};

const initialState: initialStateType = {
    isAuth: false,
    user: null,
    error: null,
    registerSuccess: false,
};

export const registerAccount = createAsyncThunk(
    'registerAccount',
    async (data: RegistrationDataType, thunkAPI) => {
        await apiPost('/users', data);
        thunkAPI.dispatch(
            login({
                email: data.email,
                password: data.password,
                rememberMe: true,
            })
        );
    }
);

export const login = createAsyncThunk('login', async (data: LoginFormType) => {
    const response: JsonServerLoginResponseType = await apiPost('/login', data);
    if (data.rememberMe) {
        localStorage.setItem('email', data.email);
        localStorage.setItem('password', data.password);
    }
    return response.data.user;
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
            state.error = null;
            state.registerSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        });
    },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
