import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { requiredProp } from 'forms/forms.constants';

import { useDispatchWithLoader } from 'hooks/useDispatchWithLoader';

import { type RegistrationDataType } from './RegistrationForm.types';

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationDataType>();

    const dispatch = useDispatchWithLoader();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <>
            <Container component="div" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="email" // TODO добавить валидацию
                            autoFocus
                            error={!!errors.email}
                            label="Email"
                            {...register('email', requiredProp)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="login"
                            autoFocus
                            error={!!errors.login}
                            label="Логин"
                            {...register('login', requiredProp)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Пароль"
                            type="password"
                            id="password"
                            error={!!errors.password}
                            {...register('password', requiredProp)}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default RegistrationForm;
