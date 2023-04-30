import createTestSlice from 'pages/CreateTest/CreateTest.slice';
import allTestsSlice from 'pages/HomePage/components/AllTests/AllTests.slice';
import profilePageSlice from 'pages/ProfilePage/ProfilePage.slice';
import testSlice from 'pages/Test/Test.slice';
import testAnalyticsSlice from 'pages/TestAnalytics/TestAnalytics.slice';
import { combineReducers } from 'redux';

import authSlice from './auth.slice';
import loaderSlice from './loader.slice';

export const rootReducer = combineReducers({
    authSlice,
    loaderSlice,
    testSlice,
    createTestSlice,
    allTestsSlice,
    profilePageSlice,
    testAnalyticsSlice,
});
