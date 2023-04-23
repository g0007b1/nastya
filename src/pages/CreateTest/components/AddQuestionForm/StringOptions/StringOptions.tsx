import { type FC } from 'react';
import { Box, TextField } from '@mui/material';

import { type StringOptionsType } from './StringOptions.types';

const StringOptions: FC<StringOptionsType> = ({ withPoints }) => {
    return (
        <Box paddingTop={2}>
            <TextField fullWidth disabled label="Тут будет ответ" />
        </Box>
    );
};

export default StringOptions;
