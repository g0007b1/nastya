import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
} from 'react-router-dom';

import CreateTest from 'pages/CreateTest';
import HomePage from 'pages/HomePage';
import NavBarPage from 'pages/NavBarPage';
import ProfilePage from 'pages/ProfilePage';
import Test from 'pages/Test';
import TestAnalytics from 'pages/TestAnalytics';

export const mainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<NavBarPage />}>
            <Route path="home" element={<HomePage />} />
            <Route path="create-test" element={<CreateTest />} />
            <Route path="profile/:userId" element={<ProfilePage />} />
            <Route path="test-analytics/:testId" element={<TestAnalytics />} />
            <Route path="test/:testId" element={<Test />} />

            <Route index element={<Navigate to="home" />} />
            <Route path="*" element={<Navigate to="home" />} />
        </Route>
    )
);

export default mainRouter;
