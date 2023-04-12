import { useCallback } from 'react';
import { type AsyncThunkAction } from '@reduxjs/toolkit';

import { useAppDispatch } from 'redux/hooks';
import { setIsLoading } from 'redux/loader.slice';
import { type AppDispatch } from 'redux/store';

export const useDispatchWithLoader = (): AppDispatch => {
    const dispatch = useAppDispatch();

    const dispatchWithLoader = useCallback(
        async <PayloadType>(
            action: AsyncThunkAction<any, PayloadType, any>
        ) => {
            dispatch(setIsLoading(true));
            await dispatch(action)
                .unwrap()
                .finally(() => dispatch(setIsLoading(false)));
        },
        []
    );

    return dispatchWithLoader as AppDispatch;
};
