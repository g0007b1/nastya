import { type RootState } from 'redux/store';

export const selectTest = (state: RootState) => state.testSlice.test;
export const selectTime = (state: RootState) => state.testSlice.time;
