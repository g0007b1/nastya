import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
} from 'react-router-dom';

import { HomePage } from '../pages/HomePage/HomePage';

export const mainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="home" element={<HomePage />} />

            <Route index element={<Navigate to="home" />} />
            <Route path="*" element={<Navigate to="home" />} />
        </Route>
    )
);

export default mainRouter;
