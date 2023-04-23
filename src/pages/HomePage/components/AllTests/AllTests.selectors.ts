import { type RootState } from '../../../../redux/store';

export const selectAllTests = (state: RootState) => state.allTestsSlice.tests;
