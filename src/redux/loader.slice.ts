import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type inititalStateType = {
    isLoading: boolean;
};

const initialState: inititalStateType = {
    isLoading: false,
};

const loaderSlice = createSlice({
    name: 'loaderSlice',
    initialState,
    reducers: {
        setIsLoading(state, { payload }: PayloadAction<boolean>) {
            state.isLoading = payload;
        },
    },
});

export const { setIsLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
