import React from 'react';
import { CircularProgress } from '@mui/material';

import { selectIsLoading } from 'components/GlobalLoader/GlobalLoader.selectors';
import { useAppSelector } from 'redux/hooks';

export const GlobalLoader = () => {
    const isLoading = useAppSelector(selectIsLoading);

    if (!isLoading) return null;

    return (
        <div
            style={{
                position: 'absolute',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                zIndex: '999999',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'hsla(0,0%,100%,.5)',
            }}
        >
            <CircularProgress />
        </div>
    );
};

export default GlobalLoader;
