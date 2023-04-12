import { type RootState } from '../../redux/store';

export const selectIsLoading = (state: RootState) =>
    state.loaderSlice.isLoading;
