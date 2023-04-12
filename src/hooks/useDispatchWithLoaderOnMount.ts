import { useEffect } from 'react';
import { type AsyncThunkAction } from '@reduxjs/toolkit';

import { useDispatchWithLoader } from 'hooks/useDispatchWithLoader';

export const useDispatchWithLoaderOnMount = <PayloadType>(
    action: AsyncThunkAction<any, PayloadType, any>
) => {
    const dispatch = useDispatchWithLoader();

    useEffect(() => {
        const dispatchWithLoader = async () => {
            await dispatch(action);
        };
        dispatchWithLoader();
    }, []);
};
