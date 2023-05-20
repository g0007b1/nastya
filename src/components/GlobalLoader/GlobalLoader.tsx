import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

import { selectIsLoading } from 'components/GlobalLoader/GlobalLoader.selectors';
import { useAppSelector } from 'redux/hooks';

export const GlobalLoader = () => {
    const isLoading = useAppSelector(selectIsLoading);

    if (!isLoading) return null;

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={() => {}}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default GlobalLoader;
