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
import Test from 'pages/Test';

export const mainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<NavBarPage />}>
            <Route path="home" element={<HomePage />} />
            <Route path="create-test" element={<CreateTest />} />
            <Route path="/test/:testId" element={<Test />} />

            <Route index element={<Navigate to="home" />} />
            <Route path="*" element={<Navigate to="home" />} />
        </Route>
    )
);

export default mainRouter;
