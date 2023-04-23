import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import GlobalLoader from 'components/GlobalLoader';

import { store } from './redux/store';
import mainRouter from './routes';

import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalLoader />
            <Suspense fallback="">
                <RouterProvider router={mainRouter} />
            </Suspense>
        </Provider>
    </React.StrictMode>
);
