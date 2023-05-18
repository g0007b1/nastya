import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Typography,
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';

import AllTests from './components/AllTests';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { selectIsLogin } from '../../redux/auth.selectors';
import { useAppSelector } from '../../redux/hooks';

export const HomePage = () => {
    const isAuth = useAppSelector(selectIsLogin);

    const [loginRegisterMode, setLoginRegisterMode] = useState<
        'login' | 'register' | ''
    >('');

    return (
        <Box>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 3,
                }}
                fixed
            >
                {!isAuth && (
                    <Box>
                        <Card sx={{ marginTop: 5, width: 570 }}>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        mt: 2,
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        textAlign="center"
                                        component="h1"
                                        variant="h5"
                                    >
                                        Тесты
                                    </Typography>
                                    <Box display="flex" gap={1} marginTop={1}>
                                        <Button
                                            onClick={() => {
                                                setLoginRegisterMode('login');
                                            }}
                                            variant="contained"
                                        >
                                            Войти
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setLoginRegisterMode(
                                                    'register'
                                                );
                                            }}
                                            variant="contained"
                                        >
                                            Зарегистрироваться
                                        </Button>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                        {loginRegisterMode === 'login' && <LoginForm />}
                        {loginRegisterMode === 'register' && (
                            <RegistrationForm />
                        )}
                    </Box>
                )}
                {isAuth && <AllTests />}
            </Container>
        </Box>
    );
};

export default HomePage;
