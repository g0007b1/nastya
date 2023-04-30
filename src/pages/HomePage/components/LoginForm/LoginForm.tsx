import React, { type FC } from 'react';
import { useForm } from 'react-hook-form';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material';

import { useDispatchWithLoader } from 'hooks/useDispatchWithLoader';
import { type LoginFormType } from 'pages/HomePage/components/LoginForm/LoginForm.type';

import { requiredProp } from '../../../../constants/forms.constants';
import { login } from '../../../../redux/auth.slice';

const LoginForm: FC = () => {
    const { register, handleSubmit } = useForm<LoginFormType>();

    const dispatch = useDispatchWithLoader();

    const onSubmit = handleSubmit((data) => {
        dispatch(login(data));
    });

    return (
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
                    <Typography component="h1" variant="h5">
                        Войти
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
                            autoComplete="email"
                            autoFocus
                            label="Email"
                            {...register('email', requiredProp)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Пароль"
                            type="password"
                            {...register('password', requiredProp)}
                            autoComplete="current-password"
                        />
                        <Box width="100%">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Запомнить меня"
                                {...register('rememberMe')}
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
                </Box>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
