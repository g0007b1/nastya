import { combineReducers } from 'redux';

import authSlice from './auth.slice';
import loaderSlice from './loader.slice';

export const rootReducer = combineReducers({ authSlice, loaderSlice });
