import {
    type Action,
    configureStore,
    type ThunkAction,
} from '@reduxjs/toolkit';

import { rootReducer } from './reducers';

export const store = configureStore({ reducer: rootReducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
