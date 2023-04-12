import { createSlice } from '@reduxjs/toolkit';

import { type TypeOrNull } from 'types/general.types';

type initialStateType = {
    isAuth: boolean;
    login: TypeOrNull<string>;
    error: TypeOrNull<string>;
    registerSuccess: boolean;
};

const initialState: initialStateType = {
    isAuth: false,
    login: null,
    error: null,
    registerSuccess: false,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
});

export default authSlice.reducer;
