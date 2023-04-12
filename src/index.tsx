import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import GlobalLoader from 'components/GlobalLoader';
import NavBar from 'components/NavBar';

import { store } from './redux/store';
import mainRouter from './routes';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalLoader />
            <Suspense fallback="">
                <NavBar />
                <RouterProvider router={mainRouter} />
            </Suspense>
        </Provider>
    </React.StrictMode>
);
