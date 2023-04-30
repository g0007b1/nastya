import { type RootState } from '../../redux/store';

export const selectProfileTests = (state: RootState) =>
    state.profilePageSlice.tests;
