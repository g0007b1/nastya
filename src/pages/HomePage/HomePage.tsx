import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import RegistrationForm from 'forms/RegistrationForm';

import LoginForm from '../../forms/LoginForm';

export const HomePage = () => {
    return (
        <Box
            height="calc(100vh - 64px)"
            alignItems="flex"
            display="flex"
            sx={{ flexGrow: 1 }}
        >
            <Container sx={{ display: 'flex', justifyContent: 'center' }} fixed>
                <LoginForm />
                <RegistrationForm />
            </Container>
        </Box>
    );
};

export default HomePage;
