import { type RootState } from '../../redux/store';

export const selectAnswers = (state: RootState) =>
    state.testAnalyticsSlice.answers;

export const selectTestForAnalytics = (state: RootState) =>
    state.testAnalyticsSlice.test;
