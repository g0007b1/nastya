import { type RootState } from './store';

export const selectIsLogin = (state: RootState) => state.authSlice.isAuth;
export const selectUser = (state: RootState) => state.authSlice.user;
export const selectError = (state: RootState) => state.authSlice.error;
